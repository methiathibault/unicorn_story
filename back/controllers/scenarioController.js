const scenario = require('../modeles/scenario');

exports.createScenario = async(req, res) => {
    try {
        await scenario.create(req.body)
        res.status(200).json("Scenario has been created")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.updateScenario = async(req, res) => {
    try {
        await scenario.update(req.body, {
            where: {id: req.params.id}
        })
        res.status(200).json("Scenario has been updated")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.deleteScenario = async(req, res) => {
    try {
        await scenario.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json("Scenario has been deleted")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.getScenarios = async(req, res) => {
    try {
        const allScenarios = await scenario.findAll()
        res.status(200).json(allScenarios)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.getScenarioById = async(req, res) => {
    try {
        const currentScenario = await scenario.findByPk(req.params.id)
        res.status(200).json(currentScenario)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.getScenarioFromStoryId = async(req, res) => {
    id = req.params.id
    try {
        const currentScenario = await scenario.findAll({where:{storyId:id}})
        res.status(200).json(currentScenario)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}
