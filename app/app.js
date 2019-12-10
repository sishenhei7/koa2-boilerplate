import Koa from 'koa';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
// import koaJwt from 'koa-jwt';
// import settings from './config/settings';
import { initLogPath } from './core/logger';
import router from './routes';

import responseFormatter from './middlewares/response_formatter';
import jwtErrorHandler from './middlewares/jwt_error_handler';
import loggerDevelopment from './middlewares/logger_development';
import loggerProduction from './middlewares/logger_production';

const app = new Koa();

// error handler
onerror(app);
app.use(jwtErrorHandler);
app.use(responseFormatter('^/api'));

// bodyparser
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  jsonLimit: '10mb',
}));
app.use(json());

// logger
if (process.env.NODE_ENV !== 'production') {
  app.use(logger());
  app.use(loggerDevelopment);
} else {
  initLogPath();
  app.use(loggerProduction);
}

// jwt
// app.use(koaJwt({
//   secret: settings.jwt.secret,
// }).unless({
//   path: settings.jwt.ignoredPath,
// }));

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
