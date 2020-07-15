import Router from '@koa/router';
import auth from './controllers/auth';
import user from './controllers/user';
import blog from './controllers/blog';
import category from './controllers/category';
import comment from './controllers/comment';
import tag from './controllers/tag';
import loginRequired from './middlewares/login_required';
import adminRequired from './middlewares/admin_required';

const router = new Router();
router.prefix('/api');

// auth
router.post('/auth/login', auth.login);
router.get('/auth/verify', loginRequired, auth.verify);
router.post('/auth/register', auth.register);
router.post('/auth/register/admin', auth.registerAdmin);
router.post('/auth/register/root', auth.registerRoot);

// user
router.get('/user', adminRequired, user.getUser);
router.delete('/user/:id', adminRequired, user.deleteUser);

// blog
router.get('/blog', blog.getBlog);
router.post('/blog', loginRequired, blog.createBlog);
router.get('/blog/:id', blog.getBlogById);
router.put('/blog/:id', loginRequired, blog.updateBlog);
router.delete('/blog/:id', loginRequired, blog.deleteBlog);

// category
router.get('/category', category.getCategory);
router.delete('/category/:id', adminRequired, category.deleteCategory);

// comment
router.get('/comment/:id', comment.getComment);
router.post('/comment', loginRequired, comment.createComment);
router.delete('/comment/:id', adminRequired, comment.deleteComment);

// tag
router.get('/tag', adminRequired, tag.getTag);

export default router;
