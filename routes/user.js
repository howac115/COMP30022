
const express = require('express');
const router = express.Router();

// User Model
const User = require('../models/user');

/* AuthenticationControllers that handles register and login */
var user_controller = require('../controllers/userController');

// GET request for one user
router.get('/:id', user_controller.user_detail_get);

// POST request for update user's detail 
router.post('/:id/update', user_controller.user_update_post);

// POST request for update user's password 
router.post('/:id/updatePassword', user_controller.user_password_update);

module.exports = router;