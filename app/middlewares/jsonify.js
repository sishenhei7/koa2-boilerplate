module.exports = () => async (ctx, next) => {
  if (ctx.toJson) {
    await next()
    return
  }

  ctx.response.toJson = ctx.toJson = (data) => {
    ctx.status = 200
    ctx.body = {
      ok: true,
      message: 'success',
      data: data || {},
    }
  }

  await next()
}
