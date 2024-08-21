const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/config', userController.createTableUnicorn);

module.exports = router