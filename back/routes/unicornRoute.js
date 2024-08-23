const express = require('express');
const router = express.Router();

const unicornController = require('../controllers/unicornController');
const middleware = require("../controllers/middleware")

router.post('/create', unicornController.createUnicorn);
router.get('/unicorns', unicornController.getUnicorns);
router.get('/unicorn/:id', unicornController.getUnicornById);
router.patch('/unicorn/:id', unicornController.updateUnicorn);
router.delete('/unicorn/:id', middleware.authenticate, unicornController.deleteUnicorn);
router.patch('/unicorn/updatestats/:id', unicornController.updateStatsUnicorn);

module.exports = router