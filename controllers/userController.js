var User = require("../models/user");
var Folio = require("../models/folio");
// import decode from 'jwt-decode';

// const JWT = "user_token_id";

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

// GET request to view one specific folio of one user
exports.user_folio_get = function (req, res) {
    Folio.findOne({
        name: req.params.name,
        user: req.params.id
    }, function (err, folio) {
        if (err) {
            res.status(409).json({ error: 'Folio not found' })
        } else {
            res.status(200).json(folio);
        }
    })
}


