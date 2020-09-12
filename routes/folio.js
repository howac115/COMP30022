const express = require('express');
const router = express.Router();

// User Model
const Folio = require('../models/user');

/* AuthenticationControllers that handles register and login */
var folio_controller = require('../controllers/folioController');

// GET request to get one portfolio
router.get('/:id', folio_controller.folio_detail_get);

// POST request to get one portfolio
router.post('/:id', folio_controller.folio_detail_post);

// GET request to all portfolios of one user
router.post('/all', folio_controller.folio_list_post);

// POST request to create a folio
router.post('/create', folio_controller.folio_create_post);

// POST request to edit a folio
router.post('/:id/edit', folio_controller.folio_edit_post);

module.exports = router;