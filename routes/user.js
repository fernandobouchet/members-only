const express = require('express');
const router = express.Router();
const {
  logout,
  signUpPage,
  signUpUser,
  logInPage,
  logInUser,
  joinPage,
  joinUser,
} = require('../controllers/userController');

router.get('/sign-up', signUpPage);

router.post('/sign-up', signUpUser);

router.get('/log-in', logInPage);

router.post('/log-in', logInUser);

router.get('/log-out', logout);

router.get('/join', joinPage);

router.post('/join', joinUser);

module.exports = router;
