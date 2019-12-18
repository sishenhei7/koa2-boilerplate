import Sequelize from 'sequelize';
import sequelize from '../core/db';

const { Model } = Sequelize;

class BlogToTag extends Model {}

BlogToTag.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  blogId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: 'blogToTag',
  },
  tagId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: 'blogToTag',
    references: null,
  },
}, {
  sequelize,
  modelName: 'blog_to_tag',
});

export default BlogToTag;
