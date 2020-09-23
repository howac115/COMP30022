var Folio = require("../models/folio");
var User = require("../models/user");
// import decode from 'jwt-decode';

// const JWT = "user_token_id";

// GET one specific folio
exports.folio_detail_get = function (req, res) {
    Folio.findById(req.params.id, function (err, folio) {
        if (err) {
            res.status(409).json({ error: 'Folio not found' })
        }
        else {
            res.status(200).json(folio);
        }
    });
}

// POST request to get one specific folio
exports.folio_detail_post = function (req, res) {
    Folio.findOne({ user: req.body.user, name: req.body.name }, function (err, folio) {
        if (err) {
            res.status(409).json({ error: 'Folio not found' })
        }
        else {
            res.status(200).json(folio);
        }
    });
}

// POST to get all portfolios of one user
exports.folio_list_post = function (req, res) {
    Folio.find({ user: req.body.user })
        .populate("user")
        .exec((err, folios) => {
            if (err) return res.status(409).send(err);
            res.status(200).json({ success: true, folios });
        });
}

// POST to create one folio
exports.folio_create_post = function (req, res) {
    Folio.findOne({
        user: req.body.user, name: req.body.name
    }).then(folio => {
        if (folio) {
            res.status(409).json({ error: 'You have used that name already!' })
        } else {
            const folio = new Folio({ name: req.body.name, user: req.body.user });
            folio.save((err, postInfo) => {
                if (err) {
                    res.status(400).json({ success: false, err })
                } else {
                    res.status(200).json({ success: true, postInfo })
                }
            })
        }
    })
}

// POST to edit one folio
exports.folio_edit_post = function (req, res) {
    Folio.findOneAndUpdate({
        user: req.body.user,
        name: req.body.name,
    }, { content: req.body.content }, {}, function (err, updatedFolio) {
        if (err) {
            res.status(400).json({ success: false, err })
        } else {
            res.status(200).json({ success: true, updatedFolio })
        }
    })
}

// DELETE to delete on folio
exports.folio_delete_post =  function (req, res) {
    Folio.findOneAndRemove({
        user: req.body.user,
        name: req.body.name,
    },function (err, deletedFolio) {
        if (err) {
            res.status(400).json({ success: false, err })
        } else {
            res.status(200).json({ success: true, deletedFolio })
        }
    })
}