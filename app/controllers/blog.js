const Sequelize = require('Sequelize')
const { User, Blog, Category, Tag, Comment } = require('../models')

const { Op } = Sequelize

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
]

// 绑定 category
const setBlogCategory = async (blog, category) => {
  const name = category
  const [newCategory] = await Category.findOrCreate({ where: { name }, defaults: { name } })
  return blog.setCategory(newCategory)
}

// 绑定 tags
const setBlogTags = async (blog, tags) => {
  const newTags = await Promise.all(
    tags.split(',').map(async (name) => {
      const [newTag] = await Tag.findOrCreate({ where: { name }, defaults: { name } })
      return newTag
    })
  )
  return blog.setTags(newTags)
}

class BlogController {
  async getBlog(ctx) {
    const {
      search = '', // 模糊搜索 标题 + 作者
      limit = 10,
      offset = 0,
    } = ctx.request.query

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
    }

    const queryInclude = [
      {
        model: User,
      },
    ]

    const count = await Blog.count({
      where,
      subQuery: false,
      include: queryInclude,
    })
    const data = await Blog.findAll({
      where,
      subQuery: false,
      include,
      limit: Number(limit),
      offset: Number(offset),
      order: [['id']],
    })

    ctx.toJson({ count, data })
  }

  async createBlog(ctx) {
    const userId = ctx.request.user.id
    const { title, category, tags, summary, content } = ctx.request.body
    const defaults = {
      title,
      summary,
      content,
      userId,
    }
    const where = { title }
    const [newBlog, isExist] = await Blog.findOrCreate({ where, defaults })

    if (isExist) ctx.throw(422, '用户已存在')

    await setBlogCategory(newBlog, category)
    await setBlogTags(newBlog, tags)
    ctx.toJson()
  }

  async deleteBlog(ctx) {
    const { id: userId, role } = ctx.request.user
    const { id } = ctx.params

    const where = { id }
    const blog = await Blog.findOne({ where })

    if (!blog) ctx.throw(400, '没有此博客')

    if (role === 'general' && blog.userId !== userId)
      ctx.throw(403, '只有原作者或管理员才能删除此博客')

    await blog.destroy()
    ctx.toJson()
  }

  async updateBlog(ctx) {
    const { id } = ctx.params
    const { body } = ctx.request
    const { id: userId, role } = ctx.request.user

    const where = { id }
    const blog = await Blog.findOne({ where })

    if (!blog) ctx.throw(400, '没有此博客')

    if (role === 'general' && blog.userId !== userId)
      ctx.throw(403, '只有原作者或管理员才能修改此博客')

    blog.update(body)

    if (body.category) {
      await blog.setCategory(null)
      await setBlogCategory(blog, body.category)
    }

    if (body.tags) {
      await blog.setTags([])
      await setBlogTags(blog, body.tags)
    }

    ctx.toJson()
  }

  async getBlogById(ctx) {
    const { id } = ctx.params

    const blog = await Blog.findOne({
      include,
      where: {
        id,
      },
    })

    if (!blog) ctx.throw(400, '没有此博客')

    blog.viewCount += 1
    blog.save()
    ctx.toJson({ blog })
  }
}

module.exports = new BlogController()
