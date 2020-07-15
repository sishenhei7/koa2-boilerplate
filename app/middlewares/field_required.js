export default (fieldList) => async (ctx, next) => {
  let msg;
  const params = ctx.request.body;

  if (fieldList.includes('username') && !params.username) {
    msg = '用户名不能为空';
  } else if (fieldList.includes('password') && !params.password) {
    msg = '密码不能为空';
  }

  if (msg) {
    ctx.failToJson(422, msg);
    return;
  }

  await next();
}