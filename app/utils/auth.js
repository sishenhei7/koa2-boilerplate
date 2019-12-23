import jwt from 'jsonwebtoken';
import settings from '../config/settings';
import { ApiError } from '../core/error';

const { jwt: { secret, expiresIn } } = settings;

const auth = {
  sign: (user) => {
    const { id, username, role } = user;
    console.log('iddddd', id);
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
      throw (new ApiError('认证失败'));
    }
  },

  verifyAdmin: (ctx) => {
    const info = auth.verifyHeaders(ctx);
    const { role } = info;

    if (role !== 'root' && role !== 'admin') throw new ApiError('只有管理员才能查看用户！');

    return info;
  },
}

export default auth;
