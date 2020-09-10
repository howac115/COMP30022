var Folio = require("../models/folio");
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

// POST to create one folio
exports.folio_create_post = function (req, res) {

    let folio = new Folio({ name: req.body.name });

    folio.save((err, postInfo) => {
        if (err) {
            res.status(400).json({ success: false, err })
        } else {
            res.status(200).json({ success: true, postInfo })
        }
    })
}