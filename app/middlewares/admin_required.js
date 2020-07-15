import auth from '../services/auth';

export default () => async (ctx, next) => {
  const user = auth.getUserInfo(ctx);

  if (!user) {
    ctx.failToJson(401, '您没有登录');
    return;
  }

  if (user.role !== 'general') {
    ctx.failToJson(403, '需要管理员权限');
    return;
  }

  ctx.request.user = user;
  await next();
}
