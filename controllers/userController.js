var User = require("../models/user");
const user = require("../models/user");
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


