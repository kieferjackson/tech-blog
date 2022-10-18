const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
    try {
        console.log('SIGNUP REQUEST BODY: ', req.body);
        const userData = await User.create
            (
                {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
            );

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id;

            res.status(200);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        console.log('LOGIN REQUEST BODY: ', req.body);
        const userToLogin = await User.findOne({ where: { email: req.body.email } });

        console.log('USER:', userToLogin);
        const GENERIC_ERROR = 'Incorrect email or password.';

        if (!userToLogin) {
            res.status(400).json({ message: GENERIC_ERROR });
            return;
        }

        const passwordValid = await userToLogin.check_password(req.body.password);

        if (!passwordValid) {
            res.status(400).json({ message: GENERIC_ERROR });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userToLogin.id;

            res.status(200).json({ user: userToLogin, message: 'You have been successfully logged in.' });
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => res.status(204).end());
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;