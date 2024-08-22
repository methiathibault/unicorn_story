const user  = require('../modeles/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createTableUnicorn = async(req, res) => {
    try {
        await user.sync({ force: true })
        res.status(200).json('Table Created')
    } catch(err) {
        console.error('Unable to connect to the db', err);
        console.log(err);
    }
}

exports.login = async(req, res) => {
    try {
        let {email,password} = req.body
        const ifExist = await user.findAll({where:{email:email}})
        //console.log(ifExist[0].dataValues.password)
        if(Object.keys(ifExist).length>0){
            if(bcrypt.compare(password, ifExist[0].dataValues.password)){
                let user = ifExist[0].dataValues.username
                const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn:'1h'})
                res.json({token})
            }else{
                return res.status(400).json({error:"not good password"})
            }
        }
        
    } catch(err) {
        console.error('Unable to connect to the db', err);
        console.log(err);
        res.status(400)
    }
}

exports.register = async(req, res) => {
    try {
        let pass = req.body.password
        let username = req.body.username
        const ifExist = await user.findAll({where:{email:req.body.email}})
        if(Object.keys(ifExist).length>0){
            res.status(500).json({error:"access denied"})
        }
        const hashedPassword = await bcrypt.hash(pass,10)
        console.log(hashedPassword)

        await user.create({username:username,email:req.body.email,password:hashedPassword})
    
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn:'1h'})
        res.json({token})
        
    } catch(err) {
        console.error('Unable to connect to the db', err);
        console.log(err);
    }
}