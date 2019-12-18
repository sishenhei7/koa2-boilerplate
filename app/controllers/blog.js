import Sequelize from 'sequelize';
import auth from '../utils/auth';
import { Blog, Category, Tag } from '../models';
import { ApiError, checkUndef } from '../core/error';

const Op = Sequelize.Op;
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
  }
];

export default {
  async getBlog(ctx) {
    const {
      search = '',
      limit = 10,
      offset = 0,
    } = ctx.request.query;

    const where = {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${search}%`,
          }
        },
        {
          author: {
            [Op.like]: `%${search}%`,
          }
        }
      ],
    }

    const count = await Blog.count({ where });
    const data = await Blog.findAll({
      where,
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
    const { username } = auth.verifyHeaders(ctx);
    const {
      title,
      category,
      tags,
      summary,
      content,
      author,
    } = ctx.request.body;

    checkUndef({ title, category, tags, summary, content, author });

    const where = { title };
    const defaults = { summary, content, author: username };
    const [newBlog, success] = await Blog.findOrCreate({ where, defaults });

    if (!success) throw new ApiError('博客标题已存在');

    const [newCategory] = await Category.findOrCreate({
      where: {
        name: category,
      },
      defaults: {
        name: category,
      },
    });
    await newBlog.setCategory(newCategory);

    const newTags = await Promise.all(tags.split(',').map(async (name) => {
      const [newTag] = await Tag.findOrCreate({ where: { name }, defaults: { name } });
      return newTag;
    }));
    await newBlog.setTags(newTags);

    ctx.body = '';
  },

  async deleteBlog(ctx) {
    const { id } = ctx.params;

    const where = { id };
    const blog = await Blog.findOne({ where });

    if (!blog) throw new ApiError('没有此博客');

    await blog.setTags([]);
    await blog.destroy();
    ctx.body = '';
  },

  async updateBlog(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    const where = { id };
    const blog = await Blog.findOne({ where });

    if (!blog) throw new ApiError('没有此博客');
    blog.update(body);

    if (body.category) {
      const [newCategory] = await Category.findOrCreate({
        where: {
          name: body.category,
        },
        defaults: {
          name: body.category,
        },
      });
      await blog.setCategory(null);
      await blog.setCategory(newCategory);
    }

    if (body.tags) {
      const newTags = await Promise.all(body.tags.split(',').map(async (name) => {
        const [newTag] = await Tag.findOrCreate({ where: { name }, defaults: { name } });
        return newTag;
      }));
      await blog.setTags([]);
      await blog.setTags(newTags);
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

    ctx.body = blog;
  },
};
