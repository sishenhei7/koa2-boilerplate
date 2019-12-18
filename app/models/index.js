import User from './user';
import Blog from './blog';
import Category from './category';
import Tag from './tag';
import BlogToTag from './blogToTag';
import Comment from './comment';

// Blog 和 Category 是多对一的关系
// belongsTo 会在 Blog 的实例下自动生成下列方法
// getCategory、setCategory、createCategory
Blog.belongsTo(Category);

// Blog 和 Tag 是 多对多 的关系
// belongsToMany 会在 Blog 的实例下自动生成下列方法
// getTags、countTags、hasTag、hasTags、setTags
// addTag、addTags、removeTag、removeTags、createTag
Blog.belongsToMany(Tag, {
  through: {
    model: BlogToTag,
    unique: false,
  },
  foreignKey: 'blogId',
  constraints: false,
});

// Blog 和 Comment 是 一对多 的关系(但是Blog是主体)
Blog.hasMany(Comment);

// User 和 Comment 是 一对多 的关系(但是User是主体)
User.hasMany(Comment);

// Blog 和 Tag 是 多对多 的关系
Tag.belongsToMany(Blog, {
  through: {
    model: BlogToTag,
    unique: false,
  },
  foreignKey: 'tagId',
  constraints: false,
});

export {
  User,
  Blog,
  Category,
  Tag,
  Comment,
};
