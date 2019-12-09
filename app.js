import Koa from 'koa';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaJwt from 'koa-jwt';
import settings from './config/settings';
import { initLogPath } from './utils/log_util';

import responseFormatter from './middlewares/response_formatter';
import jwtErrorHandler from './middlewares/jwt_error_handler';
import loggerDevelopment from './middlewares/logger_development';
import loggerProduction from './middlewares/logger_production';

import index from './routes/index';
import user from './routes/user';
import blog from './routes/blog';

const app = new Koa();
const { jwt, port } = settings;

// 初始化 log 文件夹
initLogPath();

// error handler
onerror(app);
app.use(jwtErrorHandler);

// bodyparser
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());

// logger
if (process.env.NODE_ENV !== 'production') {
  app.use(logger());
  app.use(loggerDevelopment);
} else {
  app.use(loggerProduction);
}

// jwt
app.use(koaJwt({
  secret: jwt.secret,
}).unless({
  path: jwt.ignoredPath,
}));

//仅对/api开头的url进行格式化处理
app.use(responseFormatter('^/api'));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`));
