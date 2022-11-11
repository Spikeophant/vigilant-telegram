const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'author_id',
});

User.hasMany(Comment, {
  foreignKey: 'author_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };