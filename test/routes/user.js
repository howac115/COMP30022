
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

module.exports = router;