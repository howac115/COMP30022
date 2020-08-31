var bcrypt = require("bcryptjs");
var passport = require("passport");

/* Load user model */
var User = require("../models/user");

// POST request to handle login
exports.login_post = function (req, res) {

  const { email, password } = req.body;

  // Match user
  User.findOne({
    email: email
  }).then(user => {
    if (!user) {
      res.status(409).json({ error: 'Email not registered' })
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        res.status(200).json(user)
      } else {
        res.status(409).json({ error: 'Password incorrect' })
      }
    });
  });
};

// POST request to handle register
exports.register_post = function (req, res) {

  const { firstName, lastName, email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(409).json({ error: 'Email already exists' })
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.status(200).json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

// GET request to handle logout redirects to login page
exports.logout_get = function (req, res, next) {
  req.logout();
};
