import Router from '@koa/router';
import AuthControll from './controllers/auth';
import UserControll from './controllers/user';
import BlogControll from './controllers/blog';

const router = new Router();

router.prefix('/api');
router.post('/login', AuthControll.login);
router.get('/verify', AuthControll.verify);
router.post('/register', AuthControll.register);
router.get('/user', UserControll.getAllUsers);
router.get('/blog', BlogControll.getAllBlog);

export default router;
