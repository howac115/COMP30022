module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('loginError', 'You must login to view this page');
    res.render('login', { errorMessage: req.flash("loginError") });
  }
}
