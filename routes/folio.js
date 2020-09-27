const express = require('express');
const router = express.Router();

// User Model
const Folio = require('../models/user');

/* AuthenticationControllers that handles register and login */
var folio_controller = require('../controllers/folioController');


// POST request to get one portfolio
router.post('/:id/one', folio_controller.folio_detail_post);

// POST request to all portfolios of one user
router.post('/all', folio_controller.folio_list_post);

// POST request to all portfolios of one user
router.get('/templates', folio_controller.folio_templates_get);

// POST request to create a folio
router.post('/create', folio_controller.folio_create_post);

// POST request to edit a folio
router.post('/:id/edit', folio_controller.folio_edit_post);

// POST request to change visibility of a folio
router.post('/:id/visible', folio_controller.folio_visible_post);

// DELETE request to delete a folio
router.post('/:id/delete', folio_controller.folio_delete_post);

module.exports = router;