import auth from '../services/auth';

export default () => async (ctx, next) => {
  const user = auth.getUserInfo(ctx);

  if (!user) {
    ctx.failToJson(401, '您没有登录');
    return;
  }

  ctx.request.user = user;
  await next();
}
