export default () => async (ctx, next) => {
  if (ctx.okToJson || ctx.failToJson) return await next();

  ctx.response.okToJson = ctx.okToJson = (data) => {
    ctx.status = 200;
    ctx.body = {
      ok: true,
      message: 'success',
      data: data || {},
    };
  };

  ctx.response.failToJson = ctx.failToJson = (status, msg) => {
    ctx.status = status || 500;
    ctx.body = {
      ok: false,
      message: msg,
    };
  };

  await next();
}
