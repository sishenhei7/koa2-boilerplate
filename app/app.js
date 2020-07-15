import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors';
import koaJwt from 'koa-jwt';

import settings from './config/settings';
import router from './router';

import logger from './middlewares/logger';
import responseFormatter from './middlewares/response_formatter';

const app = new Koa();

// 全局响应处理
app.use(responseFormatter('^/api'));

// 记录日志
app.use(logger());

// 设置Header
app.use(async (ctx, next) => {
  await next();
  ctx.set('X-Powered-By', 'Koa2-boilerplate');
})

// 设置跨域
app.use(
  cors({
    origins: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
  }),
);

// 设置 jwt
app.use(koaJwt({
  secret: settings.jwt.secret,
}).unless({
  path: settings.jwt.ignoredPath,
}));

// body解析
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  jsonLimit: '10mb',
}));

// 设置路由
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
