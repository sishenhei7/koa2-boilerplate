import assert from 'assert'

/**
 * 在app.use(router)之前调用
 */
const responseFormatter = (ctx) => {
  // 如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    ctx.body = {
      ok: true,
      message: 'success',
      data: ctx.body,
    }
  } else if (ctx.body === '') {
    ctx.body = {
      ok: true,
      message: 'success',
    }
  }
}

const errorFormatter = (ctx, message) => {
  ctx.status = 200
  ctx.body = {
    ok: false,
    message,
  }
  return ctx.body
}

const responseHandler = () => async (ctx, next) => {
  try {
    // 先去执行路由
    await next()
  } catch (error) {
    // 非生产环境打印错误便于调试
    if (process.env.NODE_ENV !== 'production') {
      console.log('error', error)
    }

    // 处理抛出的 assert 错误
    if (error instanceof assert.AssertionError) {
      return errorFormatter(ctx, error.message)
    }

    // 处理 jwt 认证失败
    if (error.status === 401) {
      return errorFormatter(ctx, 'Unauthorized')
    }

    return errorFormatter(ctx, 'Internal Server Error')
  }

  // 处理 404
  if (!ctx.body && (!ctx.status || ctx.status === 404 || ctx.status === 204)) {
    return errorFormatter(ctx, 'Not Found')
  }

  // 处理 405
  if (!ctx.body && ctx.status === 405) {
    return errorFormatter(ctx, 'Method Not Allowed')
  }

  // 正常返回
  if (ctx.status === 200) {
    return responseFormatter(ctx)
  }
}

export default responseHandler
