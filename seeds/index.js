const sequelize = require('../config/connection');
const seed_users = require('./userData');
const seed_posts = require('./postData');

const seedAll = async () =>
{
    await sequelize.sync({ force: true });

    await seed_users();

    await seed_posts();

    process.exit(0);
}

seedAll();
