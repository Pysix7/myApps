const express = require('express');

const router = express.Router();
const usersController = require('../controller/users');

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUser);

module.exports = router;