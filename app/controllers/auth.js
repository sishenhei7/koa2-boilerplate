import bcrypt from 'bcrypt'
import auth from '../services/auth'
import services from '../services'

class AuthController {
  async register(ctx) {
    const { username, password } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const [newUser, isExist] = await services.user.getOrCreate({
      username,
      password: hashedPassword,
    });

    if (isExist) ctx.throw(422, '用户已存在')

    const token = auth.sign(newUser)
    ctx.toJson({ token })
  }

  async login(ctx) {
    const { username, password } = ctx.request.body
    const user = services.user.getUserByUsername(username)

    if (!user) ctx.throw(422, '用户已存在')

    const isUserValid = bcrypt.compare(password, user.password)

    if (!isUserValid) ctx.throw(422, '密码错误')

    const token = auth.sign(user)
    ctx.toJson({ token })
  }

  async verify(ctx) {
    ctx.toJson()
  }

  async registerAdmin(ctx) {
    const { username, password } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const [newUser, isExist] = await services.user.getOrCreate({
      username,
      password: hashedPassword,
      role: 'admin',
    });

    if (isExist) ctx.throw(422, '用户已存在')

    const token = auth.sign(newUser)
    ctx.toJson({ token })
  }

  async registerRoot(ctx) {
    const { username, password } = ctx.request.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const [newUser, isExist] = await services.user.getOrCreate({
      username,
      password: hashedPassword,
      role: 'root',
    });

    if (isExist) ctx.throw(422, '用户已存在')

    const token = auth.sign(newUser)
    ctx.toJson({ token })
  }
}

export default new AuthController()
