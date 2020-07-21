const { initLogPath, logUtil } = require('../utils/logger')

/**
 * 打印请求日志
 */
module.exports = () => async (ctx, next) => {
  if (process.env.NODE_ENV === 'production') {
    let ms
    const start = new Date()
    initLogPath()

    try {
      await next()
      ms = new Date() - start
      logUtil.logResponse(ctx, ms)
    } catch (error) {
      ms = new Date() - start
      logUtil.logError(ctx, error, ms)

      // 继续抛错误
      throw error
    }
  } else {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  }
}
