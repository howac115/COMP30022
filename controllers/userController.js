var User = require('../models/user');
var Folio = require('../models/folio');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

var email_controller = require("./emailController.js");

// GET one specific user
exports.user_detail_get = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(409).json({ error: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    });
};

// GET request to view one specific folio of one user
exports.user_folio_get = function (req, res) {
    Folio.findOne(
        {
            name: req.params.name,
            user: req.params.id,
        },
        function (err, folio) {
            if (err) {
                res.status(409).json({ error: 'Folio not found' });
            } else {
                res.status(200).json(folio);
            }
        }
    );
};

// delete the user data, this should only be allowed when user is verified
exports.user_purge_post = function (req, res) {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            res.status(409).json('User not found in DB');
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    User.findOneAndDelete({ email: email }, function (err) {
                        if (err)
                            res.status(409).json('Delete user not succeed.');
                        res.status(200).json('Delete user succeed');
                    });
                } else {
                    res.status(409).json(
                        'Password incorrect, cannot delete user'
                    );
                }
            });
        }
    });
};

exports.user_email_post = function (req, res) {
    email_controller.data.userNotification(req.body.receiver, req.body.sender, req.body.body);
    res.status(200).json({ sender: req.body.sender, subject: req.body.subject, body: req.body.body })
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
                        emailConsent: req.body.emailConsent,
                        email: req.body.email,
                    }, function (err, updatedUser) {
                        if (err) {
                            res.status(400).json({ success: false, err });
                        } else {
                            res.status(200).json({
                                success: true,
                                updatedUser,
                            });
                        }
                    }
                );
            } else if (req.body.password != req.body.password2) {
                res.status(409).json({ error: 'Password doesn`t match' });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        User.findOneAndUpdate(
                            { _id: req.body.id },
                            {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                emailConsent: req.body.emailConsent,
                                email: req.body.email,
                                password: hash,
                            },
                            function (err, updatedUser) {
                                if (err) {
                                    res.status(400).json({
                                        success: false,
                                        err,
                                    });
                                } else {
                                    res.status(200).json({
                                        success: true,
                                        updatedUser,
                                    });
                                }
                            }
                        );
                    });
                });
            }
        }
    });
};
