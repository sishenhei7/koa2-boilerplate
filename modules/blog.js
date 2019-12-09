const db = require('../config/db')
// 引入数据库配置
const Sequelize = db.sequelize; // 使用sequelize
const Blog = Sequelize.import('../schema/blog.js')

Blog.sync({ force: false })

class BlogModel {
  static async getAllBlog(query) {
    // 通过使用sequelize 的findAll 来查询数据
    // 根据query参数实现查询关键词功能
    const blogs = await Blog.findAll({
      where: {
        ...query,
      },
      order: [
        ['id', 'DESC'],
      ],
    })
    return blogs;
  }
}

module.exports = BlogModel
