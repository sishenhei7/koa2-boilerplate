import bcrypt from 'bcrypt'
import auth from '../services/auth'
import services from '../services'

class AuthController {
  async register(ctx) {
    const { username, password } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await services.user.getOrCreate({
      username,
      password: hashedPassword,
    });

    if (result[1]) {
      ctx.failToJson(422, '用户已存在')
      return
    }

    const token = auth.sign(result[0])
    ctx.okToJson({ token })
  }

  async login(ctx) {
    const { username, password } = ctx.request.body
    const user = services.user.getUserByUsername(username)

    if (!user) {
      ctx.failToJson(404, '用户不存在')
      return
    }

    const isUserValid = bcrypt.compare(password, user.password)

    if (!isUserValid) {
      ctx.failToJson(422, '密码错误')
      return
    }

    const token = auth.sign(user)
    ctx.okToJson({ token })
  }

  async verify(ctx) {
    ctx.okToJson()
  }

  async registerAdmin(ctx) {
    const { username, password } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await services.user.getOrCreate({
      username,
      password: hashedPassword,
      role: 'admin',
    });

    if (result[1]) {
      ctx.failToJson(422, '用户已存在')
      return
    }

    const token = auth.sign(result[0])
    ctx.okToJson({ token })
  }

  async registerRoot(ctx) {
    const { username, password } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await services.user.getOrCreate({
      username,
      password: hashedPassword,
      role: 'root',
    });

    if (result[1]) {
      ctx.failToJson(422, '用户已存在')
      return
    }

    const token = auth.sign(result[0])
    ctx.okToJson({ token })
  }
}

export default new AuthController()
