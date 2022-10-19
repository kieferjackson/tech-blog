const { Post } = require('../models');

const post_data =
    [
        {
            title: "What's the deal with SQL?",
            message: "Databases, who needs 'em?",
            poster_id: 1
        },
        {
            title: "Environment variables, who needs 'em?",
            message: "Just give me access to your login credentials, what's the big deal?",
            poster_id: 2
        }
    ];

const seedPosts = () => Post.bulkCreate(post_data);

module.exports = seedPosts;