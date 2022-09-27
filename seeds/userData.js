const { User } = require('../models');

const user_data =
[
    {
        username: 'flying_pigman3',
        email: 'p1gman@hotmail.com',
        password: 'password123'
    },
    {
        username: 'l33t_hax0r',
        email: 'hacker@l33t.com',
        password: 'asdf1337'
    }
];

const seedUsers = () => User.bulkCreate(user_data);

module.exports = seedUsers;