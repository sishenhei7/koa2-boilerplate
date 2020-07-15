export default (fieldList) => async (ctx, next) => {
  let msg;
  const params = ctx.request.body;

  if (fieldList.includes('username') && !params.username) {
    msg = '用户名不能为空';
  } else if (fieldList.includes('password') && !params.password) {
    msg = '密码不能为空';
  } else if (fieldList.includes('title') && !params.title) {
    msg = '标题不能为空';
  } else if (fieldList.includes('category') && !params.category) {
    msg = '类别不能为空';
  } else if (fieldList.includes('tags') && !params.tags) {
    msg = '标签不能为空';
  } else if (fieldList.includes('summary') && !params.summary) {
    msg = '摘要不能为空';
  } else if (fieldList.includes('blogContent') && !params.content) {
    msg = '博客内容不能为空';
  } else if (fieldList.includes('blogId') && !params.blogId) {
    msg = '博客id不能为空';
  } else if (fieldList.includes('commentContent') && !params.content) {
    msg = '评论内容不能为空';
  }

  if (msg) {
    ctx.failToJson(422, msg);
    return;
  }

  await next();
}
