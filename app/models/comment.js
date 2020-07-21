const Sequelize = require('sequelize')
const sequelize = require('../db')

const { Model } = Sequelize

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    blogId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'blog_id',
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'content',
    },
  },
  {
    sequelize,
    modelName: 'comment',
  }
)

module.exports = Comment
