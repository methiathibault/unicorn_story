const express = require('express');
const router = express.Router();

const storyController = require('../controllers/storyController');
const middleware = require("../controllers/middleware")


router.get('/story', storyController.getStory);
router.get('/story/:id', storyController.getStoryById);
router.post('/create', middleware.authenticate, storyController.createStory);
router.delete('/story/:id', middleware.authenticate, storyController.deleteStory);
router.patch('/story/:id', middleware.authenticate, storyController.updateStory);

module.exports = router