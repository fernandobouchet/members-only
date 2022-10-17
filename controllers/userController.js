const passport = require('passport');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const signUpPage = (req, res) => {
  res.render('sign-up');
};

const signUpUser = (req, res) => {
  bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/log-in');
    });
  });
};

const logInPage = (req, res) => {
  res.render('log-in');
};

const logInUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/error',
});

const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

const joinPage = (req, res) => {
  res.render('join');
};

const joinUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      member_status:
        req.body.secret_key !== 'normal' &&
        (req.body.secret_key === 'member' || req.body.secret_key === 'admin')
          ? req.body.secret_key
          : user.member_status,
    },
    {}
  );
  res.redirect('/');
};

module.exports = {
  logout,
  signUpPage,
  signUpUser,
  logInPage,
  logInUser,
  joinPage,
  joinUser,
};
