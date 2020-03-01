const express = require('express');

const router =  express.Router();
const appController = require('../controllers/data')

router.get('/places', appController.searchPlace);
router.get('/drivers', appController.getDrivers);

module.exports = router;