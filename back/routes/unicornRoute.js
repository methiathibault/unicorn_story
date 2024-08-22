const express = require('express');
const router = express.Router();

const unicornController = require('../controllers/unicornController');

router.get('/config', unicornController.createTableUnicorn);
router.post('/create', unicornController.createUnicorn);
router.get('/unicorns', unicornController.getUnicorns);
router.get('/unicorn/:id', unicornController.getUnicornById);
router.patch('/unicorn/:id', unicornController.updateUnicorn);
router.delete('/unicorn/:id', unicornController.deleteUnicorn);

module.exports = router