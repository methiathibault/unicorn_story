const express = require('express');
const router = express.Router();

const storyController = require('../controllers/storyController');

router.get('/story', storyController.getStory);
router.get('/story/:id', storyController.getStoryById);
router.post('/create', storyController.createStory);
router.delete('/story/:id', storyController.deleteStory);
router.patch('/story/:id', storyController.updateStory);

module.exports = router