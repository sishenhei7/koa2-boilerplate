import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import koaJwt from 'koa-jwt';

import settings from './config/settings';
import { initLogPath } from './core/logger';
import router from './routes';

import responseFormatter from './middlewares/response_formatter';
import loggerDevelopment from './middlewares/logger_development';
import loggerProduction from './middlewares/logger_production';

const app = new Koa();

// 全局响应处理
app.use(responseFormatter('^/api'));

// 设置Header
app.use(async (ctx, next) => {
  await next();
  ctx.set('X-Powered-By', 'Koa2-boilerplate');
})

// 记录日志
if (process.env.NODE_ENV !== 'production') {
  app.use(logger());
  app.use(loggerDevelopment);
} else {
  initLogPath();
  app.use(loggerProduction);
}

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
