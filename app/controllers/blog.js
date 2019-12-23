import Sequelize from 'sequelize';
import auth from '../utils/auth';
import { User, Blog, Category, Tag, Comment } from '../models';
import { ApiError, checkUndef } from '../core/error';

const { Op } = Sequelize;

// 查询结果带上 category 和 tags
const include = [
  {
    model: Category,
    attributes: ['id', 'name'],
  },
  {
    model: Tag,
    attributes: ['id', 'name'],
    through: {
      attributes: [],
    },
  },
  {
    model: Comment,
    attributes: ['id', 'content'],
  },
  {
    model: User,
    attributes: {
      exclude: ['password'],
    },
  },
];

// 绑定 category
const setBlogCategory = async (blog, category) => {
  const name = category;
  const [newCategory] = await Category.findOrCreate({ where: { name }, defaults: { name } });
  return blog.setCategory(newCategory);
};

// 绑定 tags
const setBlogTags = async (blog, tags) => {
  const newTags = await Promise.all(tags.split(',').map(async (name) => {
    const [newTag] = await Tag.findOrCreate({ where: { name }, defaults: { name } });
    return newTag;
  }));
  return blog.setTags(newTags);
};

export default {
  async getBlog(ctx) {
    const {
      search = '', // 模糊搜索 标题 + 作者
      limit = 10,
      offset = 0,
    } = ctx.request.query;

    const where = {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          '$user.username$': {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    const queryInclude = [
      {
        model: User,
      },
    ];

    const count = await Blog.count({
      where,
      subQuery: false,
      include: queryInclude,
    });
    const data = await Blog.findAll({
      where,
      subQuery: false,
      include,
      limit: Number(limit),
      offset: Number(offset),
      order: [
        ['id'],
      ],
    });

    ctx.body = { count, data };
  },

  async createBlog(ctx) {
    const { id: userId } = auth.verifyHeaders(ctx);
    const {
      title,
      category,
      tags,
      summary,
      content,
    } = ctx.request.body;

    checkUndef({
      title, category, tags, summary, content,
    });

    const where = { title };
    const defaults = {
      title,
      summary,
      content,
      userId,
    };
    const [newBlog, success] = await Blog.findOrCreate({ where, defaults });

    if (!success) throw new ApiError('博客标题已存在');

    await setBlogCategory(newBlog, category);
    await setBlogTags(newBlog, tags);
    ctx.body = '';
  },

  async deleteBlog(ctx) {
    const { id: userId, role } = auth.verifyHeaders(ctx);
    const { id } = ctx.params;

    const where = { id };
    const blog = await Blog.findOne({ where });

    if (!blog) throw new ApiError('没有此博客！');
    if (blog.userId !== userId && role === 'general') {
      throw new ApiError('只有原作者或管理员才能删除此博客！');
    }

    await blog.destroy();
    ctx.body = '';
  },

  async updateBlog(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const { id: userId, role } = auth.verifyHeaders(ctx);

    const where = { id };
    const blog = await Blog.findOne({ where });

    if (!blog) throw new ApiError('没有此博客');
    if (blog.userId !== userId && role === 'general') {
      throw new ApiError('只有原作者或管理员才能修改此博客！');
    }

    blog.update(body);

    if (body.category) {
      await blog.setCategory(null);
      await setBlogCategory(blog, body.category);
    }

    if (body.tags) {
      await blog.setTags([]);
      await setBlogTags(blog, body.tags);
    }

    ctx.body = '';
  },

  async getBlogById(ctx) {
    const { id } = ctx.params;

    const blog = await Blog.findOne({
      include,
      where: {
        id,
      },
    });

    if (!blog) throw new ApiError('没有此博客');

    blog.viewCount += 1;
    blog.save();
    ctx.body = blog;
  },
};
