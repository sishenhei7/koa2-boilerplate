import services from '../services'

const adminRequired = () => async (ctx, next) => {
  const user = services.auth.getUserInfo(ctx)

  if (!user) ctx.throw(401, '您没有登录')

  if (user.role !== 'general') ctx.throw(403, '需要管理员权限')

  ctx.request.user = user
  await next()
}

export default adminRequired
