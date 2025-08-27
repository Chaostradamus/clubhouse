const passport = require('passport');

exports.getLogin = (req, res) => {
  res.render('login', { errors: req.session.messages });
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
});