const express = require('express');
const Message = require('../models/messages');
const router = express.Router();

router.get('/', async (req, res) => {
  const messages = await Message.find().sort({ date: -1 });
  res.render('home', { messages: messages });
});

router.get('/log-out', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
