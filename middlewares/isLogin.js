const isLogin = (req, res, next) => {
  if (req.session.accountid) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = isLogin;
