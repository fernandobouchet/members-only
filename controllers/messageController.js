const Message = require('../models/messages');
const User = require('../models/user');

const getMessage = (req, res) => {
  res.render('message_form');
};

const postMessage = async (req, res) => {
  const user = await User.findById(req.user.id);
  const message = await Message.create({
    title: req.body.title,
    text: req.body.text,
    date: new Date(),
    user: user.username,
  });
  res.status(200);
  res.redirect('/');
};

module.exports = { postMessage, getMessage };
