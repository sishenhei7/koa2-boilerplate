import ApiError from '../core/error';

/**
 * 在app.use(router)之前调用
 */
const responseFormatter = (ctx) => {
  // 如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
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

const urlFilter = () => async (ctx, next) => {
  try {
    // 先去执行路由
    await next();

    // 处理 404
    if (!ctx.body && (!ctx.status || ctx.status === 404)) {
      return errorFormatter(ctx, new ApiError('NOT_FOUND'));
    }
  } catch (error) {
    // 处理抛出的 ApiError 错误
    if (error instanceof ApiError) {
      return errorFormatter(ctx, error);
    }

    return errorFormatter(ctx, new ApiError('INTERNAL_SERVER_ERROR'));
  }

  responseFormatter(ctx);
}

export default urlFilter;
