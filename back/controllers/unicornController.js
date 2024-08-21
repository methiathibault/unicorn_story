const unicorn = require('../modeles/unicorn')

exports.createTableUnicorn = async(req, res) => {
    try {
        await unicorn.sync({ force: true })
        res.status(200).json('Table Created')
    } catch(err) {
        console.error('Unable to connect to the db', err);
        console.log(err);
    }
}