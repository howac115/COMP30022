const express = require('express');
const router = express.Router();

// User Model
const User = require('../models/user');

/* AuthenticationControllers that handles register and login */
var auth_controller = require('../controllers/authController');

/* Login handle on POST */
router.post('/login', auth_controller.login_post);

/* Register handle on POST */
router.post('/register', auth_controller.register_post);

module.exports = router;