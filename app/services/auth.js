import jwt from 'jsonwebtoken';
import settings from '../config/settings';

const { jwt: { secret, expiresIn } } = settings;

const auth = {
  sign: (user) => {
    const { id, username, role } = user;
    const token = jwt.sign({ id, username, role }, secret, { expiresIn });
    return token;
  },

  getUserInfo: (ctx) => {
    let user = {};

    try {
      const { authorization } = ctx.headers;
      const token = authorization && authorization.split(' ')[1] || '123';
      user = jwt.verify(token, secret);
    } catch (error) {
      user = null;
    }

    return user;
  },
}

export default auth;
