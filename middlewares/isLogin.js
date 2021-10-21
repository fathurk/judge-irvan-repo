const isLogin = (req, res, next) => {
  if (req.session.accountId) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = isLogin;
