import BlogService from '../services/blog';
// import ApiError from '../core/error';
// import errorNames from '../utils/error_names';

class BlogControl {
  async getAllBlog(ctx) {
    const { query } = ctx.request; // 获取前端传来的参数
    const data = await BlogService.getAllBlog(query); // 获取查询的数据
    ctx.body = data;
    // throw new ApiError(errorNames.USER_NOT_EXIST);
  }
}

export default new BlogControl();