export default {
  port: 3000,
  db: {
    name: 'koa',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678q',
  },
  jwt: {
    secret: 'secret',
    expiresIn: '1d', // 默认单位：秒
    ignoredPath: [
      /^\/api\/(?!(user))/,
      // /^\/api\/login/,
      // /^\/api\/register/,
      // /^\/api\/blog/,
    ],
  },
};
