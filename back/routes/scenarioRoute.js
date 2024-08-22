const express = require('express')
const router = express.Router()

const scenarioController = require('../controllers/scenarioController')

router.post('/create', scenarioController.createScenario);
router.patch('/scenario/:id', scenarioController.updateScenario)
router.delete('/scenario/:id', scenarioController.deleteScenario)
router.get('/scenarios', scenarioController.getScenarios)
router.get('/scenario/:id', scenarioController.getScenarioById)
router.get("/scenario/story/:id", scenarioController.getScenarioFromStoryId)
router.get("/scenario/story/first/:id", scenarioController.getFirstScenarioFromStoryId)

module.exports = router