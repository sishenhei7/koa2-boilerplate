import logUtil from '../utils/log_util';

export default async (ctx, next) => {
  // 响应开始时间
  const start = new Date();
  // 响应间隔时间
  let ms;
  try {
    await next();
    ms = new Date() - start;
    logUtil.logResponse(ctx, ms);
  } catch (err) {
    ms = new Date() - start;
    logUtil.logError(ctx, err, ms);
  }
}
