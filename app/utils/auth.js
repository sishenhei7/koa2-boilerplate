import jwt from 'jsonwebtoken';
import assert from 'assert';
import settings from '../config/settings';

const { jwt: { secret, expiresIn } } = settings;

const auth = {
  sign: (user) => {
    const { id, username, role } = user;
    const token = jwt.sign({ id, username, role }, secret, { expiresIn });
    return token;
  },

  verifyHeaders: (ctx) => {
    try {
      const { authorization } = ctx.headers;
      const token = authorization && authorization.split(' ')[1];
      const info = jwt.verify(token, secret);
      return info;
    } catch (err) {
      assert(false, '认证失败');
    }
  },

  verifyAdmin: (ctx) => {
    const info = auth.verifyHeaders(ctx);
    const { role } = info;

    assert(role === 'general', '只有管理员才能查看用户');

    return info;
  },
}

export default auth;
