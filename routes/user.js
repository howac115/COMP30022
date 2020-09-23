const express = require('express');
const router = express.Router();

// User Model
const User = require('../models/user');

/* AuthenticationControllers that handles register and login */
var user_controller = require('../controllers/userController');

// GET request for one user
router.get('/:id', user_controller.user_detail_get);

// GET request to view one specific folio of one user
router.get('/:id/:name', user_controller.user_folio_get);

module.exports = router;