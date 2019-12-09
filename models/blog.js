import sequelize from '../core/db';
import Sequelize from 'sequelize';

const { Model } = Sequelize;

class BlogModel extends Model {}

BlogModel.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'title',
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'author',
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'content',
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

export default BlogModel;
