/**
 * 在app.use(router)之前调用
 */
const responseHandler = () => async (ctx, next) => {
  try {
    // 先去执行路由
    await next()
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // 非生产环境打印错误便于调试
      console.log('error', error)
    } else if (error.status === 500) {
      // 生产环境 500 的时候不返回详细信息给客户端，因为可能包含敏感信息
      ctx.failToJson(500, 'Internal Serval Error');
    }
  }

  // 处理 404
  if (!ctx.body && (!ctx.status || ctx.status === 404 || ctx.status === 204)) {
    return ctx.failToJson(404, 'Not Found')
  }
}

export default responseHandler
