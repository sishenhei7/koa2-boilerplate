const { User, Blog, Comment } = require('../models')

class UserService {
  getAllUsers() {
    // 不要显示密码
    const condition = {
      attributes: {
        exclude: ['password'],
      },
      order: [['id']],
    }

    return User.findAll(condition)
  }

  getUserById(id) {
    const condition = {
      where: { id },
    }

    return User.findOne(condition)
  }

  getUserByUsername(username) {
    const condition = {
      where: { username },
    }

    return User.findOne(condition)
  }

  getOrCreate(user) {
    const condition = {
      where: {
        username: user.username,
      },
      defaults: user,
    }

    return User.findOrCreate(condition)
  }

  async deleteBlogById(id) {
    await Blog.destroy({ where: { userId: id } })
    await Comment.destroy({ where: { userId: id } })
    await User.destroy({ where: { id } })
  }
}

module.exports = new UserService()
