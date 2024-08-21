const user  = require('../modeles/user')

exports.createTableUnicorn = async(req, res) => {
    try {
        await user.sync({ force: true })
        res.status(200).json('Table Created')
    } catch(err) {
        console.error('Unable to connect to the db', err);
        console.log(err);
    }
}