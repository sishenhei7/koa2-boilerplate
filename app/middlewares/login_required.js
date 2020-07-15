import auth from '../services/auth'

const loginRequired = () => async (ctx, next) => {
  const user = auth.getUserInfo(ctx)

  if (!user) {
    ctx.failToJson(401, '您没有登录')
    return
  }

  ctx.request.user = user
  await next()
}

export default loginRequired
