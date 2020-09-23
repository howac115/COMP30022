var express = require('express');
var router = express.Router();

// Index page.
router.get('/', (req, res) => res.render('login'));

module.exports = router;
