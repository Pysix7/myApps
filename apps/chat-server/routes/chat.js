const express = require('express');

const router = express.Router();
const chatController = require('../controller/chat');

router.post('/join-room', chatController.joinRoom);

module.exports = router;