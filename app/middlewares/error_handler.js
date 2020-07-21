/**
 * 在app.use(router)之前调用
 */
module.exports = () => async (ctx, next) => {
  await next().catch((error) => {
    // 非生产环境打印错误便于调试
    if (process.env.NODE_ENV !== 'production') {
      console.log('error', error)
    }

    ctx.status = error.status || 500
    ctx.body = {
      ok: false,
      message: error.expose ? error.message : 'Internal Serval Error',
    }
  })
}
