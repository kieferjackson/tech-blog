const User = require('./User');
const Post = require('./Post');

User.hasMany( Post, { foreignKey: 'poster_id' });

Post.belongsTo( User, { foreignKey: 'poster_id' });

module.exports = { User, Post };