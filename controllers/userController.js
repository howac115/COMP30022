var User = require("../models/user");
var Folio = require("../models/folio");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// GET one specific user
exports.user_detail_get = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(409).json({ error: 'User not found' })
        }
        else {
            res.status(200).json(user);
        }
    });
}

// POST request for update user's detail 
exports.user_update_post = function (req, res) {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user && req.body.id != user.id) {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            if (req.body.password == '') {
                User.findOneAndUpdate(
                    { _id: req.body.id },
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email
                    },
                    function (err, updatedUser) {
                        if (err) {
                            res.status(400).json({ success: false, err });
                        } else {
                            res.status(200).json({ success: true, updatedUser });
                        }
                    }
                );
            } else if (req.body.password != req.body.password2) {
                res.status(409).json({ error: 'Password doesn`t match' })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        User.findOneAndUpdate(
                            { _id: req.body.id },
                            {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: hash
                            },
                            function (err, updatedUser) {
                                if (err) {
                                    res.status(400).json({ success: false, err });
                                } else {
                                    res.status(200).json({ success: true, updatedUser });
                                }
                            }
                        );
                    });
                });
            }
        }
    });
}