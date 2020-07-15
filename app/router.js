import Router from '@koa/router'
import auth from './controllers/auth'
import user from './controllers/user'
import blog from './controllers/blog'
import category from './controllers/category'
import comment from './controllers/comment'
import tag from './controllers/tag'
import loginRequired from './middlewares/login_required'
import adminRequired from './middlewares/admin_required'
import fieldRequired from './middlewares/field_required'

const router = new Router()
router.prefix('/api')

// auth
router.post('/auth/login', fieldRequired(['username', 'password']), auth.login)
router.get('/auth/verify', loginRequired(), auth.verify)
router.post('/auth/register', fieldRequired(['username', 'password']), auth.register)
router.post('/auth/register/admin', fieldRequired(['username', 'password']), auth.registerAdmin)
router.post('/auth/register/root', fieldRequired(['username', 'password']), auth.registerRoot)

// user
router.get('/user', adminRequired(), user.getUser)
router.delete('/user/:id', adminRequired(), user.deleteUser)

// blog
router.get('/blog', loginRequired(), blog.getBlog)
router.post(
  '/blog',
  fieldRequired(['title', 'category', 'tags', 'summary', 'content']),
  loginRequired(),
  blog.createBlog
)
router.get('/blog/:id', blog.getBlogById)
router.put('/blog/:id', loginRequired(), blog.updateBlog)
router.delete('/blog/:id', loginRequired(), blog.deleteBlog)

// category
router.get('/category', category.getCategory)
router.delete('/category/:id', adminRequired(), category.deleteCategory)

// comment
router.get('/comment/:id', comment.getComment)
router.post(
  '/comment',
  fieldRequired(['blogId', 'commentContent']),
  loginRequired(),
  comment.createComment
)
router.delete('/comment/:id', adminRequired(), comment.deleteComment)

// tag
router.get('/tag', adminRequired(), tag.getTag)

export default router
