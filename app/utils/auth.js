import jwt from 'jsonwebtoken';
import settings from '../config/settings';
import { ApiError } from '../core/error';

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
      throw (new ApiError('认证失败'));
    }
  },
}

export default auth;
