const choice = require('../modeles/choice');

exports.getChoice = async(req, res) => {
    try {
        const allChoice = await choice.findAll()
        res.status(200).json(allChoice)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.getChoiceById = async(req, res) => {
    try {
        const currentChoice = await choice.findByPk(req.params.id)
        res.status(200).json(currentChoice)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.deleteChoice = async(req, res) => {
    try {
        await choice.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json("choice has disapear")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.updateChoice = async(req, res) => {
    
    try {
        await choice.update(req.body, {
            where: {id: req.params.id}
        })
        res.status(200).json("choice has been updated")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}