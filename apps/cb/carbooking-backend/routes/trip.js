const express = require('express');

const router =  express.Router();
const bookingController = require('../controllers/trip')

router.post('/book', bookingController.bookTrip);

module.exports = router;