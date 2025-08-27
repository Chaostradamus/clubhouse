const { updateMembershipStatus, updateAdminStatus } = require('../db/queries');

exports.getJoinClub = (req, res) => {
  if (!req.user) return res.redirect('/login');
  if (req.user.membership_status) return res.redirect('/');
  
  res.render('member', { error: null, isAdmin: false });
};

exports.postJoinClub = async (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  if (req.user.membership_status) return res.redirect('/');
  
  const { passcode } = req.body;
  
  if (passcode === process.env.CLUB_PASSCODE) {
    try {
      await updateMembershipStatus(req.user.id);
      // Update user in session
      req.user.membership_status = true;
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  } else {
    res.render('member', { error: 'Incorrect passcode', isAdmin: false });
  }
};

exports.getBecomeAdmin = (req, res) => {
  if (!req.user) return res.redirect('/login');
  if (req.user.is_admin) return res.redirect('/');
  
  res.render('member', { error: null, isAdmin: true });
};

exports.postBecomeAdmin = async (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  if (req.user.is_admin) return res.redirect('/');
  
  const { passcode } = req.body;
  
  if (passcode === process.env.ADMIN_PASSCODE) {
    try {
      await updateAdminStatus(req.user.id);
      // Update user in session - ONLY if passcode is correct
      req.user.is_admin = true;
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  } else {
    // DON'T update user status if passcode is wrong
    res.render('member', { error: 'Incorrect passcode', isAdmin: true });
  }
};