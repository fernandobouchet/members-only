const express = require('express');
const { postMessage, getMessage } = require('../controllers/messageController');
const route = express.Router();

route.get('/', getMessage);

route.post('/', postMessage);

module.exports = route;
