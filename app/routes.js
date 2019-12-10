import Router from '@koa/router';
import AuthControll from './controllers/auth';
import UserControll from './controllers/user';
import BlogControll from './controllers/blog';

const router = new Router();

router.prefix('/api');
router.get('/login', AuthControll.login);
router.post('/user/register', UserControll.register);
router.get('/blog/', BlogControll.getAllBlog);

export default router;
