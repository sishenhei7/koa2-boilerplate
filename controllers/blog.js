const BlogModel = require('../modules/blog'); // 引入model
// const ApiError = require('../error/ApiError');
// const ApiErrorNames = require('../error/ApiErrorNames');

class BlogControl {
  static async getAllBlog(ctx) {
    const { query } = ctx.request; // 获取前端传来的参数
    const data = await BlogModel.getAllBlog(query); // 获取查询的数据
    ctx.body = data;
    // throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
  }
}

module.exports = BlogControl
