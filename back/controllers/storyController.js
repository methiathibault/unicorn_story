const story = require('../modeles/story');

exports.getStory = async(req, res) => {
    try {
        const allStory = await story.findAll()
        res.status(200).json(allStory)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.getStoryById = async(req, res) => {
    try {
        const currentStory = await story.findByPk(req.params.id)
        res.status(200).json(currentStory)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.deleteStory = async(req, res) => {
    try {
        await story.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json("story has disapear")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.updateStory = async(req, res) => {
    
    try {
        await story.update(req.body, {
            where: {id: req.params.id}
        })
        res.status(200).json("story has been updated")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.createStory = async(req, res) => {
    try {
        await story.create( req.boy )
        res.status(200).json("story has been created")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}