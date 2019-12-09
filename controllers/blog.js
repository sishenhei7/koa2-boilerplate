import BlogModel from '../modules/blog';
// import ApiError from '../error/ApiError';
// import apiErrorNames from '../error/apiErrorNames';

class BlogControl {
  async getAllBlog(ctx) {
    const { query } = ctx.request; // 获取前端传来的参数
    const data = await BlogModel.getAllBlog(query); // 获取查询的数据
    ctx.body = data;
    // throw new ApiError(apiErrorNames.USER_NOT_EXIST);
  }
}

export default new BlogControl();
