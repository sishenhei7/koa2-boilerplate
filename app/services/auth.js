const jwt = require('jsonwebtoken')
const settings = require('../config/settings')
const { secret, expiresIn } = settings.jwt

class AuthService {
  sign(user) {
    const { id, username, role } = user
    const token = jwt.sign({ id, username, role }, secret, { expiresIn })
    return token
  }

  getUserInfo(ctx) {
    let user = {}

    try {
      const { authorization } = ctx.headers
      const token = (authorization && authorization.split(' ')[1]) || '123'
      user = jwt.verify(token, secret)
    } catch {
      user = null
    }

    return user
  }
}

module.exports = new AuthService()
