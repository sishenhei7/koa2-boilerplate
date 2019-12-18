import moment from 'moment';
import Sequelize from 'sequelize';
import sequelize from '../core/db';

const { Model } = Sequelize;

class Blog extends Model {}

Blog.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
