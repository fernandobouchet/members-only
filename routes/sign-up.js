const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('sign-up');
});

router.post('/', (req, res) => {
  const user = new User({
    username: req.body.username,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
