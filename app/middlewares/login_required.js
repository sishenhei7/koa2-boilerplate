import auth from '../utils/auth';

export default () => async (ctx, next) => {
  ctx.request.user = auth.verifyHeaders(ctx);
  next();
}
