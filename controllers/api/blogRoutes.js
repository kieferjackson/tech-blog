const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// CREATE new post
router.post('/', async (req, res) => {
    try {
        const { title, message, submit_date } = req.body;

        if (req.session.loggedIn) {
            const new_post = await Post.create
                (
                    {
                        title,
                        message,
                        submit_date,
                        poster_id: req.session.user_id,
                    }
                );

            res.redirect(`/dashboard/${req.session.user_id}`);
            return;
        }
        else {
            res.status(400).json({ message: `Insufficient information to add pet` });
        }

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

module.exports = router;