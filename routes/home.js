var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

/* Load user model */
var User = require('../models/user');
var { forwardAuthenticated } = require('../config/auth');

/* AuthenticationControllers that handles register and login */
var auth_controller = require('../controllers/authController');


/* Display home page on GET. */
router.get('/', auth_controller.index);

/* Display Login page on GET */
router.get('/login', auth_controller.login_get);

/* Login handle on POST */
router.post('/login', auth_controller.login_post);

/* Register page on GET */
router.get('/register', auth_controller.register_get);

/* Register handle on POST */
router.post('/register', auth_controller.register_post);

/* Logout handle on GET */
router.get('/logout', auth_controller.logout_get);

module.exports = router;
