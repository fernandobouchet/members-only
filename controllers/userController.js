const passport = require('passport');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const signUpPage = (req, res) => {
  res.render('sign-up', { user: undefined, errors: undefined });
};

const signUpUser = [
  body('username', 'Username is required')
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject('Username already in use');
      }
    })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email')
    .isEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject('Email already in use');
      }
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 5 }).escape(),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign-up', {
        errors: errors.array(),
      });
      return;
    }

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
        res.status(200);
        res.redirect('/');
      });
    });
  },
];

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

const joinUser = [
  body('secret_key', 'Secret key is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error('There is no secret key');
    }

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
  },
];

module.exports = {
  logout,
  signUpPage,
  signUpUser,
  logInPage,
  logInUser,
  joinPage,
  joinUser,
};
