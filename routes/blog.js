const router = require('koa-router')() // 使用koa-router 来指定接口路由
const BlogControll = require('../controllers/blog') // 引入Control部分

router.prefix('/api/blog')

// 使用router.get 提供get请求
router.get('/', BlogControll.getAllBlog)

module.exports = router
