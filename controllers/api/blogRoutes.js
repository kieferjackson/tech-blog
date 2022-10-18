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

module.exports = router;