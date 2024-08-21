const express = require('express');
const router = express.Router();

const choiceController = require('../controllers/choiceController');

router.get('/choices', choiceController.getChoice);
router.get('/choice/:id', choiceController.getChoiceById);
router.patch('/choice/:id', choiceController.deleteChoice);
router.delete('/choice/:id', choiceController.updateChoice);

module.exports = router