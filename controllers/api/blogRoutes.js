const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// CREATE new post
router.post('/', async (req, res) => {
    try {
        const { title, message } = req.body;

        if (req.session.loggedIn) {
            const new_post = await Post.create
                (
                    {
                        title,
                        message,
                        poster_id: req.session.user_id,
                    }
                );

            res.redirect(`/dashboard/${req.session.user_id}`);
            return;
        }
        else {
            res.status(400).json({ message: `Insufficient information to add post` });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// CREATE new comment for a post
router.post('/comment', async (req, res) => {
    try {
        const { post_id, message } = req.body;

        if (req.session.loggedIn) {
            const new_comment = await Comment.create
                (
                    {
                        message,
                        poster_id: req.session.user_id,
                        post_id
                    }
                );

            res.redirect(`/post/${post_id}`);
            return;
        }
        else {
            res.status(400).json({ message: `Insufficient information to add comment` });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Get all posts with comments
router.get('/all', async (req, res) => {
    try {
        const allPosts = await Post.findAll({ include: { model: Comment } });

        res.status(200).json(allPosts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Get all comments
router.get('/all-comments', async (req, res) => {
    try {
        const allComments = await Comment.findAll();

        res.status(200).json(allComments);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET Post by id
router.get('/:id', async (req, res) => {
    const given_post_id = req.params.id;

    try {
        const postData = await Post.findByPk(given_post_id, { include: { model: Comment } });

        if (!postData) {
            res.status(404).json({ message: `No post with ID: ${given_post_id}` });
            return;
        }

        res.status(200).json(postData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Update post by id
router.put('/:id', async (req, res) =>
{
    const given_post_id = req.params.id;

    try
    {
        const postToUpdate = await Post.findByPk(given_post_id);

        if (!postToUpdate)
        {
            res.status(404).json({ message: `No post with ID: ${given_post_id}` });
            return;
        }

        // Updated selected post with the request body
        postToUpdate.set(req.body);
        await postToUpdate.save();

        res.redirect(`/post/${given_post_id}`);
    }
    catch (error)
    {
        res.status(500).json(error);
    }
});

// Delete post by id
router.delete('/:id', async (req, res) =>
{
    const given_post_id = req.params.id;

    try
    {
        const postToDelete = await Post.findByPk(given_post_id);

        if (!postToDelete)
        {
            res.status(400).json({ message: `No post with ID: ${given_post_id}` });
            return;
        }

        await postToDelete.destroy();

        res.redirect(`/dashboard/${req.session.user_id}`);
    }
    catch (error)
    {
        res.status(500).json(error);
    }
});

module.exports = router;