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

// error handler
app.use(responseFormatter('^/api'));

// bodyparser
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  jsonLimit: '10mb',
}));

// logger
if (process.env.NODE_ENV !== 'production') {
  app.use(logger());
  app.use(loggerDevelopment);
} else {
  initLogPath();
  app.use(loggerProduction);
}

app.use(koaJwt({
  secret: settings.jwt.secret,
}).unless({
  path: settings.jwt.ignoredPath,
}));

// cors
app.use(
  cors({
    origins: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
  })
);

// routes
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
