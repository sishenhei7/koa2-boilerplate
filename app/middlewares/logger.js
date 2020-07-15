import { initLogPath, logUtil } from '../utils/logger';

/**
 * 打印请求日志
 */
export default () => async (ctx, next) => {
  if (process.env.NODE_ENV !== 'production') {

    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);

  } else {
    let ms;
    const start = new Date();
    initLogPath();

    try {
      await next();
      ms = new Date() - start;
      logUtil.logResponse(ctx, ms);
    } catch (err) {
      ms = new Date() - start;
      logUtil.logError(ctx, err, ms);

      // 继续抛错误
      throw (err);
    }
  }
}
