import Router from 'koa-router';
import BlogControll from '../controllers/blog';

const router = new Router();

router.prefix('/api/blog');

// 提供路由
router.get('/', BlogControll.getAllBlog);

export default router;
