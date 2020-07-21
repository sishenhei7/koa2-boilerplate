const Router = require('@koa/router')
const auth = require('./controllers/auth')
const user = require('./controllers/user')
const blog = require('./controllers/blog')
const category = require('./controllers/category')
const comment = require('./controllers/comment')
const tag = require('./controllers/tag')
const loginRequired = require('./middlewares/login_required')
const adminRequired = require('./middlewares/admin_required')
const fieldRequired = require('./middlewares/field_required')

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
router.get('/blog', blog.getBlog)
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
  fieldRequired(['blogId', 'content']),
  loginRequired(),
  comment.createComment
)
router.delete('/comment/:id', adminRequired(), comment.deleteComment)

// tag
router.get('/tag', adminRequired(), tag.getTag)

module.exports = router
