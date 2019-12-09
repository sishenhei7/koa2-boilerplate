import Router from 'koa-router';
import auth from '../utils/auth';

const router = new Router();

router.prefix('/api/user');

router.get('/', (ctx) => {
  ctx.body = 'this is a user response!';
});

router.get('/bar', (ctx) => {
  ctx.body = 'this is a user/bar response';
});

router.get('/login', async (ctx) => {
  const token = auth.sign(ctx, ctx.request.body);
  ctx.body = token;
});

export default router;
