const express = require('express');

const router = express.Router();
const authController = require('../controller/auth');

router.get('/users/me', authController.currentUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;