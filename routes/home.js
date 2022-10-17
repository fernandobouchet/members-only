const express = require('express');
const Message = require('../models/messages');
const router = express.Router();

router.get('/', async (req, res) => {
  const messages = await Message.find().sort({ date: -1 });
  res.render('home', { messages: messages });
});

module.exports = router;
