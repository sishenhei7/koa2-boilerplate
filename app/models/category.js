import sequelize from '../core/db';
import Sequelize from 'sequelize';

const { Model } = Sequelize;

class Category extends Model {}

Category.init({
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
  modelName: 'category',
});

export default Category;
