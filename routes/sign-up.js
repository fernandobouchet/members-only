const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcryptjs = require('bcryptjs');

router.get('/', (req, res) => {
  res.render('sign-up');
});

router.post('/', (req, res) => {
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
});

module.exports = router;
