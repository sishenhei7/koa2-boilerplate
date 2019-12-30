import moment from 'moment';
import Sequelize from 'sequelize';
import sequelize from '../db';

const { Model } = Sequelize;

class Blog extends Model {}

Blog.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  summary: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'summary',
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'content',
  },
  viewCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'view_count',
    defaultValue: 0,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm');
    },
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm');
    },
  },
}, {
  sequelize,
  modelName: 'blog',
});

export default Blog;
