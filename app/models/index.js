const User = require('./user')
const Blog = require('./blog')
const Category = require('./category')
const Tag = require('./tag')
const Comment = require('./comment')

// A belongsTo B 会在 A 的实例下自动生成下列方法
// getXxx、setXxx、createXxx

// A hasOne B 会在 B 的实例下自动生成下列方法
// getXxx、setXxx、createXxx

// A belongsToMany B 会在 A 的实例下自动生成下列方法
// getXxxs、countXxxs、hasXxx、hasXxxs、setXxxs
// addXxx、addXxxs、removeXxx、removeXxxs、createXxx

// A hasMany B 会在 B 的实例下自动生成下列方法
// getXxxs、countXxxs、hasXxx、hasXxxs、setXxxs
// addXxx、addXxxs、removeXxx、removeXxxs、createXxx

// Blog 和 User 是 多对一 的关系
Blog.belongsTo(User)
User.hasMany(Blog)

// Blog 和 Category 是多对一的关系
Blog.belongsTo(Category)
Category.hasMany(Blog)

// Blog 和 Tag 是 多对多 的关系
Blog.belongsToMany(Tag, {
  through: 'blogToTag',
  foreignKey: 'blogId',
  // constraints: false, // 是否禁用引用约束
})
Tag.belongsToMany(Blog, {
  through: 'blogToTag',
  foreignKey: 'tagId',
})

// Blog 和 Comment 是 一对多 的关系
Blog.hasMany(Comment)
Comment.belongsTo(Blog)

// User 和 Comment 是 一对多 的关系(但是User是主体)
User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = {
  User,
  Blog,
  Category,
  Tag,
  Comment,
}
