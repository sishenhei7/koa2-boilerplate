/**
 * 在app.use(router)之前调用
 */
const responseHandler = () => async (ctx, next) => {
  try {
    // 先去执行路由
    await next()
  } catch (error) {
    // 非生产环境打印错误便于调试
    if (process.env.NODE_ENV !== 'production') {
      console.log('error', error)
    }

    ctx.status = error.status || 500
    ctx.body = {
      ok: false,
      message: error.expose ? error.message : 'Internal Serval Error',
    }
  }

  // 处理 404
  if (!ctx.body && ctx.status === 404) {
    ctx.status = 404
    ctx.body = {
      ok: false,
      message: 'Not Found',
    }
  }
}

export default responseHandler
