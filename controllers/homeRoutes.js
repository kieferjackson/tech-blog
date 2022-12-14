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
        const userData = await User.findByPk(req.params.id, { include: Post });
        const { username } = userData;

        const posts = userData.posts.map((post_data) => post_data.get({ plain: true }));

        // Determines whether or not the user is the original poster or not
        const user_is_op = userData.id === req.session.user_id;
        console.log(`${username}'s POST DATA: `, posts);
        // Render the user's dashboard
        res.render('dashboard', { username, posts, loggedIn: req.session.loggedIn, user_id: req.session.user_id, user_is_op });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, { include: { all: true, nested: true } });

        if(postData)
        {
            const post =
            {
                "id": postData.id,
                "title": postData.title,
                "submit_date": postData.createdAt,
                "message": postData.message,
                "user": { "username": postData.user.username },
                "comments": postData.comments.map((comment) => comment.get({ plain: true }))
            }

            // Determines whether or not the user is the original poster or not
            const user_is_op = postData.user.id === req.session.user_id;

            // Render the post page
            res.render('post', { post, loggedIn: req.session.loggedIn, user_id: req.session.user_id, user_is_op });
        }
        else { res.status(404).json({ message: `No post could be found with ID: ${req.params.id}`})}
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