import auth from '../services/auth'

const loginRequired = () => async (ctx, next) => {
  const user = auth.getUserInfo(ctx)

  if (!user) ctx.throw(401, '您没有登录')

  ctx.request.user = user
  await next()
}

export default loginRequired
