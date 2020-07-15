import bcrypt from 'bcrypt'
import auth from '../services/auth'
import { User } from '../models'

class AuthController {
  async register(ctx) {
    const { username, password } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password: hashedPassword,
      },
    })

    if (newUser[1]) {
      ctx.failToJson(422, '用户已存在')
      return
    }

    const token = auth.sign(newUser[0])
    ctx.okToJson({ token })
  }

  async login(ctx) {
    const { username, password } = ctx.request.body
    const user = await User.findOne({
      where: {
        username,
      },
    })

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
    const newUser = await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password: hashedPassword,
        role: 'admin',
      },
    })

    if (newUser[1]) {
      ctx.failToJson(422, '用户已存在')
      return
    }

    const token = auth.sign(newUser[0])
    ctx.okToJson({ token })
  }

  async registerRoot(ctx) {
    const { username, password } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
        password: hashedPassword,
        role: 'root',
      },
    })

    if (newUser[1]) {
      ctx.failToJson(422, '用户已存在')
      return
    }

    const token = auth.sign(newUser[0])
    ctx.okToJson({ token })
  }
}

export default new AuthController()
