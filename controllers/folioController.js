// UPDATE: 3:11PM 28/09/2020 Yutao Wang
// After testing found the folio_delete_post produces a bug where
// if user and name not provided correctly, there is supposed to
// be an error produced as we expect. But there is not
// The APIs should not change, but the inner function is changed

// UPDATE: 4:22 PM 28/09/2020 Yutao Wang
// After testing the above bug also applied to folio_edit_post
// and folio_detail_post and folio_list_post
// thus same solution are applied as above

var Folio = require('../models/folio');
var User = require('../models/user');
var async = require("async");
const user = require('../models/user');

// POST request to get one specific folio
exports.folio_detail_post = function (req, res) {
    async.parallel({
        folio: function (callback) {
            Folio.findOne({
                user: req.body.user,
                name: req.body.name
            }).exec(callback);
        },
        user: function (callback) {
            User.findById({
                _id: req.body.user
            }).exec(callback);
        }
    }, function (err, results) {
        if (err) {
            res.status(404).json({ error: 'server error' });
        } else if (results.folio == null) {
            res.status(409).json({ error: 'folio not found' });
        } else {
            res.status(200).json({ folio: results.folio, user: results.user });
        }
    })
};

// POST to get all portfolios of one user
exports.folio_list_post = function (req, res) {
    Folio.findOne({ user: req.body.user }).then((user) => {
        if (!user) {
            res.status(409).json({ error: 'User not found' });
        } else {
            Folio.find({ user: req.body.user })
                .populate('user')
                .exec((err, folios) => {
                    if (err) res.status(409).send(err);
                    else res.status(200).json({ success: true, folios });
                });
        }
    });
};

// POST to get all templates folio
exports.folio_templates_get = function (req, res) {
    Folio.find({ shareAsTemplate: true }).exec((err, folios) => {
        if (err) return res.status(409).send(err);
        res.status(200).json({ success: true, folios });
    });
};

// POST to create one folio
exports.folio_create_post = function (req, res) {
    Folio.findOne({
        user: req.body.user,
        name: req.body.name,
    }).then((folio) => {
        if (folio) {
            res.status(409).json({ error: 'You have used that name already!' });
        } else {
            const folio = new Folio({
                name: req.body.name, user: req.body.user,
                shareAsTemplate: false, visible: true
            });
            folio.save((err, postInfo) => {
                if (err) {
                    res.status(400).json({ success: false, err });
                } else {
                    res.status(200).json({ success: true, postInfo });
                }
            });
        }
    });
};

// POST to clone one folio
exports.folio_clone_post = function (req, res) {
    Folio.findOne({
        user: req.body.user,
        name: req.body.name,
    }).then((folio) => {
        if (folio) {
            res.status(409).json({ error: 'You have used that name already!' });
        } else {
            const folio = new Folio({
                name: req.body.name,
                user: req.body.user,
                content: req.body.content,
                shareAsTemplate: false,
                visible: true
            });
            folio.save((err, postInfo) => {
                if (err) {
                    res.status(400).json({ success: false, err });
                } else {
                    res.status(200).json({ success: true, postInfo });
                }
            });
        }
    });
};

// POST to edit one folio
exports.folio_edit_post = function (req, res) {
    const reqBody = {
        user: req.body.user,
        name: req.body.name,
    };
    Folio.findOne(reqBody).then((folio) => {
        if (!folio) {
            res.status(409).json('folio not found in DB');
        } else {
            Folio.findOneAndUpdate(
                reqBody,
                { content: req.body.content },
                {},
                function (err, updatedFolio) {
                    if (err) {
                        res.status(400).json({ success: false, err });
                    } else {
                        res.status(200).json({ success: true, updatedFolio });
                    }
                }
            );
        }
    });
};

// POST request to change visibility of a folio
exports.folio_visible_post = function (req, res) {
    Folio.findOne({
        user: req.body.user,
        name: req.body.name,
    }).then((folio) => {
        if (!folio) {
            res.status(400).json({ success: false });
        } else {
            Folio.findOneAndUpdate(
                {
                    user: req.body.user,
                    name: req.body.name,
                },
                {
                    visible: req.body.visible,
                    shareAsTemplate: req.body.shareAsTemplate,
                },
                function (err, updatedFolio) {
                    if (err) {
                        res.status(400).json({ success: false, err });
                    } else {
                        res.status(200).json({ success: true, updatedFolio });
                    }
                }
            );
        }
    });
};

// POST to delete on folio
exports.folio_delete_post = function (req, res) {
    const reqBody = {
        user: req.body.user,
        name: req.body.name,
    };
    Folio.findOne(reqBody).then((folio) => {
        if (!folio) {
            res.status(409).json('folio not found in DB');
        } else {
            Folio.findOneAndDelete(reqBody, function (err) {
                if (err) res.status(409).json('Delete folio not succeed.');
                res.status(200).json('Delete folio succeed');
            });
        }
    });
};
