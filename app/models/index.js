import User from './user';
import Blog from './blog';
import Category from './category';
import Tag from './tag';
import BlogToTag from './blogToTag';

// Blog 和 Category 是多对一的关系
// Blog 和 Tag 是 多对多 的关系
Blog.belongsTo(Category);
Blog.belongsToMany(Tag, {
  through: {
    model: BlogToTag,
    unique: false,
  },
  foreignKey: 'blogId',
  constraints: false,
});

// Blog 和 Tag 是 多对多 的关系
Tag.belongsToMany(Blog, {
  through: {
    model: BlogToTag,
    unique: false,
  },
  foreignKey: 'tagId',
  constraints: false,
});

export default {
  User,
  Blog,
  Category,
  Tag,
};
