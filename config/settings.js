export default {
  port: 3000,
  db: {
    name: 'koa',
    account: 'root',
    password: '12345678q',
  },
  jwt: {
    tokenName: 'tokenName',
    secret: 'secret',
    expiresIn: '24h', // 默认单位：秒
    ignoredPath: [
      /^\/api\/user\/login/,
      /^\/api\/user\/register/,
    ],
  },
};
