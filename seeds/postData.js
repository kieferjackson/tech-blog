const { Post } = require('../models');

const post_data =
[
    {
        title: "What's the deal with SQL?",
        submit_date: '2022-09-27',
        message: "Databases, who needs 'em?",
        poster_id: 1
    },
    {
        title: "Environment variables, who needs 'em?",
        submit_date: '2022-10-02',
        message: "Just give me access to your login credentials, what's the big deal?",
        poster_id: 2
    }
];

const seedPosts = () => Post.bulkCreate(post_data);

module.exports = seedPosts;