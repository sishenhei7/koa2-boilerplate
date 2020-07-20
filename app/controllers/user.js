import services from '../services'

class UserController {
  async getUser(ctx) {
    const users = await services.user.getUser();
    ctx.okToJson({ users })
  }

  async deleteUser(ctx) {
    const user = await services.user.getUserById(ctx.params.id);

    if (!user) {
      ctx.failToJson(404, '没有此用户')
      return
    }

    services.user.deleteUser(ctx.params.id);
    ctx.okToJson()
  }
}

export default new UserController()
