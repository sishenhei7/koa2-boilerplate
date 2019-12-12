import jwt from 'jsonwebtoken';
import settings from '../config/settings';

const { jwt: { secret, expiresIn } } = settings;

const auth = {
  sign: (info) => {
    const token = jwt.sign(info, secret, { expiresIn });
    return token;
  },

  verify: (token) => {
    let ret = true;
    try {
      ret = jwt.verify(token, secret);
    } catch (err) {
      ret = false;
    }
    return ret;
  },
}

export default auth;
