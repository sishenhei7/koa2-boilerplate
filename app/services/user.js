const { User, Blog, Comment } = require('../models')

class UserService {
  async getAllUsers() {
    // 不要显示密码
    const condition = {
      attributes: {
        exclude: ['password'],
      },
      order: [['id']],
    }

    const user = await User.findAll(condition)
    return user
  }

  async getUserById(id) {
    const condition = {
      where: { id },
    }

    const user = await User.findOne(condition)
    return user
  }

  async getUserByUsername(username) {
    const condition = {
      where: { username },
    }

    const user = await User.findOne(condition)
    return user
  }

  async getOrCreate(user) {
    const newUser = await User.findOrCreate({
      where: {
        username: user.username,
      },
      defaults: user,
    })
    return newUser
  }

  async deleteBlogById(id) {
    await Blog.destroy({ where: { userId: id } })
    await Comment.destroy({ where: { userId: id } })
    await User.destroy({ where: { id } })
  }
}

module.exports = new UserService()
