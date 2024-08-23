const express = require('express');
const router = express.Router();

const choiceController = require('../controllers/choiceController');
const middleware = require("../controllers/middleware")

router.get('/choices', choiceController.getChoice);
router.get('/choice/:id', choiceController.getChoiceById);
router.post('/create', middleware.authenticate, choiceController.createChoice);
router.patch('/choice/:id', middleware.authenticate, choiceController.updateChoice);
router.delete('/choice/:id', middleware.authenticate, choiceController.deleteChoice);
router.get('/choices/scenario/:id', choiceController.getChoiceByScenarioId)

module.exports = router