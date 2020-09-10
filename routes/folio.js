const express = require('express');
const router = express.Router();

// User Model
const Folio = require('../models/user');

/* AuthenticationControllers that handles register and login */
var folio_controller = require('../controllers/folioController');

// GET request to get one user
router.get('/:id', folio_controller.folio_detail_get);

// POST request to create a folio
router.post('/create', folio_controller.folio_create_post);

module.exports = router;