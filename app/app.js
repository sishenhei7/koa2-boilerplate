const Koa = require('Koa')
const bodyparser = require('koa-bodyparser')
const cors = require('@koa/cors')
const router = require('./router')
const logger = require('./middlewares/logger')
const jsonify = require('./middlewares/jsonify')
const errorHandler = require('./middlewares/error_handler')

const app = new Koa()

// 全局错误处理
app.use(errorHandler('^/api'))

// 加上全局方法： jsonify
app.use(jsonify())

// 记录日志
app.use(logger())

// 设置跨域
app.use(
  cors({
    origins: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
  })
)

// 设置Header
app.use(async (ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2-boilerplate')
})

// body解析
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
    jsonLimit: '10mb',
  })
)

// 设置路由
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
