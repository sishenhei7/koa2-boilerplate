import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import cors from '@koa/cors'
import koaJwt from 'koa-jwt'

import settings from './config/settings'
import router from './router'

import logger from './middlewares/logger'
import jsonify from './middlewares/jsonify'
import errorHandler from './middlewares/error_handler'

const app = new Koa()

// 错误处理
app.use(errorHandler('^/api'))

// 记录日志
app.use(logger())

// 设置Header
app.use(async (ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2-boilerplate')
})

// 设置跨域
app.use(
  cors({
    origins: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
  })
)

// 设置 jwt
app.use(
  koaJwt({
    secret: settings.jwt.secret,
  }).unless({
    path: settings.jwt.ignoredPath,
  })
)

// 加上 jsonify 方法
app.use(jsonify())

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

export default app
