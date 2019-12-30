import Sequelize from 'sequelize';
import sequelize from '../db';

const { Model } = Sequelize;

class Tag extends Model {}

Tag.init({
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
}, {
  sequelize,
  modelName: 'tag',
});

export default Tag;
