import moment from 'moment'
import Sequelize from 'sequelize'
import sequelize from '../db'

const { Model } = Sequelize

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'username',
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'password',
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'role',
      defaultValue: 'general',
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm')
      },
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm')
      },
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
)

export default User
