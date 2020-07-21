import { User, Blog, Comment } from '../models'

class UserService {
  async getAllUsers() {
    // 不要显示密码
    const condition = {
      attributes: {
        exclude: ['password'],
      },
      order: [['id']],
    }

    return await User.findAll(condition)
  }

  async getUserById(id) {
    const condition = {
      where: { id },
    }

    return await User.findOne(condition)
  }

  async getUserByUsername(username) {
    const condition = {
      where: { username },
    }

    return await User.findOne(condition)
  }

  async getOrCreate(user) {
    return await User.findOrCreate({
      where: {
        username: user.username,
      },
      defaults: user,
    })
  }

  async deleteBlogById(id) {
    await Blog.destroy({ where: { userId: id } })
    await Comment.destroy({ where: { userId: id } })
    await User.destroy({ where: { id } })
  }
}

export default new UserService()
