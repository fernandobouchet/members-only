const express = require('express');
const {
  postMessage,
  getMessage,
  deleteMessage,
} = require('../controllers/messageController');
const route = express.Router();

route.get('/', getMessage);

route.post('/', postMessage);

route.post('/delete', deleteMessage);

module.exports = route;
