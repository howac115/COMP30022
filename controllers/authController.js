const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');

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
        jwt.sign(
          { id: user.id },
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
              }
            })
          }
        )
        // res.status(200).json(user)
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
          newUser.save().then(user => {

            jwt.sign(
              { id: user.id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                  }
                })
              }
            )
          }
          );
        });
      });
    }
  });
};

// GET request to handle logout redirects to login page
exports.logout_get = function (req, res, next) {
  req.logout();
};
