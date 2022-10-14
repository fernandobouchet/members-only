const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, 'Please add a username'] },
    lastname: { type: String, required: [true, 'Please add a lastname'] },
    email: { type: String, required: [true, 'Please add an email'] },
    member_status: { type: String, default: 'normal' },
    password: { type: String, required: [true, 'Please add a password'] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
