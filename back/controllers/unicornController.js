const unicorn = require('../modeles/unicorn');

exports.createTableUnicorn = async(req, res) => {
    try {
        await unicorn.sync({ force: true })
        res.status(200).json('Table Created')
    } catch(err) {
        console.error('Unable to connect to the db', err);
        console.log(err);
    }
}

exports.createUnicorn = async(req, res) => {
    const {name, hp, strenght, agility, intelligence } = req.body
    try {
        await unicorn.create(
            { 
                name: name,
                hp: hp, 
                strenght: strenght, 
                agility: agility, 
                intelligence: intelligence
            }
        )
        res.status(200).json("Unicorn has been spawned")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.getUnicorns = async(req, res) => {
    try {
        const allUnicorn = await unicorn.findAll()
        res.status(200).json(allUnicorn)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.getUnicornById = async(req, res) => {
    try {
        const currentUnicorn = await unicorn.findByPk(req.params.id)
        res.status(200).json(currentUnicorn)
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.deleteUnicorn = async(req, res) => {
    try {
        await unicorn.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json("Unicorn has been killed")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}

exports.updateUnicorn = async(req, res) => {
    
    try {
        await unicorn.update(req.body, {
            where: {id: req.params.id}
        })
        res.status(200).json("Unicorn has been updated")
    } catch(err) {
        res.status(500).json({ error: "Unable to connect to db"})
        console.log(err)
    }
}