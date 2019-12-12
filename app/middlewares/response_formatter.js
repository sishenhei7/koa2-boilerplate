import ApiError from '../core/error';
import { isDef } from '../utils/util';

/**
 * 在app.use(router)之前调用
 */
const responseFormatter = (ctx) => {
  // 如果有返回数据，将返回数据添加到data中
  if (isDef(ctx.body)) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: ctx.body,
    }
  } else {
    ctx.body = {
      code: 0,
      message: 'success',
    }
  }
}

const errorFormatter = (ctx, err) => {
  ctx.status = 200;
  ctx.body = {
    code: err.code,
    message: err.message,
  }
  return ctx.body;
}

const responseHandler = () => async (ctx, next) => {
  try {
    // 先去执行路由
    await next();

    // 处理 404
    if (!ctx.body && (!ctx.status || ctx.status === 404)) {
      return errorFormatter(ctx, new ApiError('NOT_FOUND'));
    }
  } catch (error) {
    // 非生产环境打印错误便于调试
    if (process.env.NODE_ENV !== 'production') {
      console.log('error', error);
    }

    // 处理抛出的 ApiError 错误
    if (error instanceof ApiError) {
      return errorFormatter(ctx, error);
    }

    // 处理 jwt 认证失败
    if (error.status === 401) {
      return errorFormatter(ctx, new ApiError('UNAUTHORIZED'));
    }

    return errorFormatter(ctx, new ApiError('INTERNAL_SERVER_ERROR'));
  }

  // 处理 405
  if (!ctx.body && ctx.status === 405) {
    return errorFormatter(ctx, new ApiError('METHOD_NOT_ALLOWED'));
  } else if (ctx.status === 200) {
    return responseFormatter(ctx);
  }
}

export default responseHandler;
