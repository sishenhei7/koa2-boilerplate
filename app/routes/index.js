import Router from '@koa/router';
import initAuthRoutes from './auth';
import initUserRoutes from './user';
import initBlogRoutes from './blog';

const router = new Router();

router.prefix('/api');
initAuthRoutes(router);
initUserRoutes(router);
initBlogRoutes(router);

export default router;
