const express = require('express');
const router = express.Router();

const unicornController = require('../controllers/unicornController');

router.get('/config', unicornController.createTableUnicorn);

module.exports = router