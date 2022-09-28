const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Create new user
router.post('/', async (req, res) =>
{
    try
    {
        const userData = await User.create
        (
            {
                username: req.body.username,
                email: req.body.username,
                password: req.body.password
            }
        );

        req.session.save( () =>
        {
            req.session.loggedIn = true;

            res.status(200);
        });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

// Login user
router.post('/login', async (req, res) =>
{
    try
    {
        const userToLogin = await User.findOne({ where: { email: req.body.email } });

        const GENERIC_ERROR = 'Incorrect email or password.';

        if (!userToLogin)
        {
            res.status(400).json({ message: GENERIC_ERROR });
            return;
        }

        req.session.save( () =>
        {
            req.session.loggedIn = true;

            res.status(200).json({ user: userToLogin, message: 'You have been successfully logged in.' });
        })
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;