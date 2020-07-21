const Sequelize = require('sequelize')
const sequelize = require('../db')

const { Model } = Sequelize

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'name',
    },
  },
  {
    sequelize,
    modelName: 'tag',
  }
)

module.exports = Tag
