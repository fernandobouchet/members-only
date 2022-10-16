const express = require('express');
const route = express.Router();
const Message = require('../models/messages');
const User = require('../models/user');

route.get('/', (req, res) => {
  res.render('message_form');
});

route.post('/', async (req, res) => {
  const user = await User.findById(req.user.id);
  const message = await Message.create({
    title: req.body.title,
    text: req.body.text,
    date: new Date(),
    user: user.username,
  });
  res.status(200);
  res.redirect('/');
});

module.exports = route;
