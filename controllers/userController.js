var User = require('../models/user');
var Folio = require('../models/folio');
const bcrypt = require('bcryptjs');

// import decode from 'jwt-decode';

// const JWT = "user_token_id";

// GET one specific user
exports.user_detail_get = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(409).json({error: 'User not found'});
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
                res.status(409).json({error: 'Folio not found'});
            } else {
                res.status(200).json(folio);
            }
        }
    );
};

// delete the user data, this should only be allowed when user is verified
exports.user_purge_post = function (req, res) {
    const {email, password} = req.body;
    User.findOne({email: email}).then((user) => {
        if (!user) {
            res.status(409).json('User not found in DB');
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    User.findOneAndDelete({email: email}, function (err) {
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
