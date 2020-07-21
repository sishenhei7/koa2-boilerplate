import services from '../services'

class UserController {
  async getUser(ctx) {
    const users = await services.user.getUser()
    ctx.toJson({ users })
  }

  async deleteUser(ctx) {
    const user = await services.user.getUserById(ctx.params.id)

    if (!user) ctx.throw(404, '没有此用户')

    services.user.deleteUser(ctx.params.id)
    ctx.toJson()
  }
}

export default new UserController()
