const isLogin = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = isLogin;
