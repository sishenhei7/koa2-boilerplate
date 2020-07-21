const services = require('../services')

module.exports = () => async (ctx, next) => {
  const user = services.auth.getUserInfo(ctx)

  if (!user) ctx.throw(401, '您没有登录')

  ctx.request.user = user
  await next()
}
