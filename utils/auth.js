const jwt = require('jsonwebtoken');
const {
  jwt: {
    tokenName,
    secret,
    expiresIn,
  },
} = require('../config/settings');

const AUTHORIZATION = 'Authorization';

const auth = {
  sign: (ctx, info) => {
    const token = jwt.sign(info || { name: 'name' }, secret, { expiresIn });
    ctx.set(AUTHORIZATION, `Bearer ${token}`);
    ctx.cookies.set(tokenName, token, {
      maxAge: expiresIn,
      httpOnly: true,
    });
    return token;
  },

  verify: (token) => {
    let ret = true;
    try {
      jwt.verify(token, secret);
    } catch (err) {
      ret = false;
    }
    return ret;
  },
}

module.exports = auth;
