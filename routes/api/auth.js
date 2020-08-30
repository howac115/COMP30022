const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/user');

// @route GET api/users
// @desc  Get all users
// @access Public
router.get('/login', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users));
});

// @route POST api/users
// @desc  Create a user
// @access Public
router.post('/register', (req, res) => {

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    newUser.save().then(user => res.json(user));
});

module.exports = router;