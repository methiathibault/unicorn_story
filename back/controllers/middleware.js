
const jwt = require('jsonwebtoken')

exports.authenticate = async(req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization

    console.log(token)

    if(token && process.env.JWT_SECRET){
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if(err){
                res.status(401).json({error : "Access denied verify"})
            } else {
                next()
            }
        })
    } else {
        res.status(401).json({error : "Access denied"})
    }
}