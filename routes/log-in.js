const express = require('express');
const passport = require('passport');
const route = express.Router();

route.get('/', (req, res) => {
  res.render('log-in');
});

route.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/error',
  })
);

module.exports = route;
