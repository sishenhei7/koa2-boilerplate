import Blog from '../models/blog';

class BlogService {
  async getAllBlog(query) {
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

export default new BlogService();
