const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

const ensureMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.membership_status) {
    return next();
  }
  res.redirect('/');
};

const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    return next();
  }
  res.status(403).send('Forbidden');
};

module.exports = {
  ensureAuthenticated,
  ensureMember,
  ensureAdmin
};