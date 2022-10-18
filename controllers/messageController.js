const { body, validationResult } = require('express-validator');
const Message = require('../models/messages');
const User = require('../models/user');

const getMessage = (req, res) => {
  res.render('message_form', {
    message: undefined,
    errors: undefined,
  });
};

const postMessage = [
  body('title', 'Message title is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Message text is required').trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error('There is no user logged in');
    }

    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      date: new Date(),
      user: user.username,
    });

    if (!errors.isEmpty()) {
      res.render('message_form', {
        message,
        errors: errors.array(),
      });
      return;
    }
    message.save((err) => {
      if (err) {
        return next(err);
      }
    });
    res.status(200);
    res.redirect('/');
  },
];

const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.body.messageid);
  if (!message) {
    res.status(400);
    throw new Error('Message not found');
  }
  await message.remove();
  res.status(200);
  res.redirect('/');
};

module.exports = { postMessage, getMessage, deleteMessage };
