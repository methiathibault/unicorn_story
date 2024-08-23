const express = require('express')
const router = express.Router()

const scenarioController = require('../controllers/scenarioController')
const middleware = require("../controllers/middleware")

router.post('/create', middleware.authenticate, scenarioController.createScenario);
router.patch('/scenario/:id', middleware.authenticate, scenarioController.updateScenario)
router.delete('/scenario/:id', middleware.authenticate, scenarioController.deleteScenario)
router.get('/scenarios', scenarioController.getScenarios)
router.get('/scenario/:id', scenarioController.getScenarioById)
router.get("/scenario/story/:id", scenarioController.getScenarioFromStoryId)
router.get("/scenario/story/first/:id", scenarioController.getFirstScenarioFromStoryId)

module.exports = router