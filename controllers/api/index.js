const router = require('express').Router();

const blog_routes = require('./blogRoutes.js');
const user_routes = require('./userRoutes.js');

router.use('/blogs', blog_routes);
router.use('/user', user_routes);

module.exports = router;