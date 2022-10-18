const router = require('express').Router();
const { User, Post } = require('../models');

// GET all posts and render to homepage
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({ include: User });

        const posts = allPosts.map((post) => post.get({ plain: true }));

        console.log('REQUEST SESSION: ', req.session);

        // Render the homepage view
        res.render('home', { posts, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/dashboard/:id', async (req, res) => {
    try {
        const userPosts = await User.findByPk(req.params.id, { include: Post });

        const user = userPosts.map((user_data) => post.get({ plain: true }));

        // Render the user's dashboard
        res.render('dashboard', { user, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET all users
router.get('/users', async (req, res) => {
    try {
        const allUsers = await User.findAll();

        const users = allUsers.map((user) => user.get({ plain: true }));

        // Return all posts in the database
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Login Page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

module.exports = router;