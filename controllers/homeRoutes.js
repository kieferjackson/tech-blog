const router = require('express').Router();
const { User, Post } = require('../models');

// GET all posts
router.get('/', async (req, res) =>
{
    try
    {
        const allPosts = await Post.findAll();

        const posts = allPosts.map( (post) => post.get({ plain: true }));

        // Render the dashboard view
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET all users
router.get('/users', async (req, res) =>
{
    try
    {
        const allUsers = await User.findAll();

        const users = allUsers.map( (user) => user.get({ plain: true }));

        // Return all posts in the database
        res.status(200).json(users);
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;