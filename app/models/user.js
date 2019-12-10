import sequelize from '../core/db';
import Sequelize from 'sequelize';

const { Model } = Sequelize;

class User extends Model {}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
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
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
}, {
  sequelize,
  freezeTableName: false,
});

export default User;
