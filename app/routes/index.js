import Router from '@koa/router';
import initAuthRoutes from './auth';
import initUserRoutes from './user';
import initBlogRoutes from './blog';
import initCategoryRoutes from './category';
import initTagRoutes from './tag';
import initCommentRoutes from './comment';

const router = new Router();

router.prefix('/api');
initAuthRoutes(router);
initUserRoutes(router);
initBlogRoutes(router);
initCategoryRoutes(router);
initTagRoutes(router);
initCommentRoutes(router);

export default router;
