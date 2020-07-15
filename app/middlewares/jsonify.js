const jsonify = () => async (ctx, next) => {
  if (ctx.okToJson || ctx.failToJson) {
    await next()
    return
  }

  ctx.response.okToJson = ctx.okToJson = (data) => {
    ctx.status = 200
    ctx.body = {
      ok: true,
      message: 'success',
      data: data || {},
    }
  }

  ctx.response.failToJson = ctx.failToJson = (status, message) => {
    ctx.status = status || 500
    ctx.body = {
      ok: false,
      message,
    }
  }

  await next()
}

export default jsonify
