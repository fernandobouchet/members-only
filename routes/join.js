const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('join');
});

router.post('/', async (req, res) => {
  const user = await User.findById(req.user.id);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      member_status:
        req.body.secret_key !== 'normal' &&
        (req.body.secret_key === 'member' || req.body.secret_key === 'admin')
          ? req.body.secret_key
          : user.member_status,
    },
    {}
  );
  res.redirect('/');
});

module.exports = router;
