const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany( Post, { foreignKey: 'poster_id' });

Post.belongsTo( User, { foreignKey: 'poster_id' });

Post.hasMany( Comment, { foreignKey: 'post_id' });

Comment.belongsTo( User, { foreignKey: 'poster_id' });

module.exports = { User, Post, Comment };