const { Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: "mariadb"
})
sequelize.authenticate().then(()=>{
    console.log("auth reussit")
}).catch((err)=>{
    console.log("erreur : "+ err)
})

module.exports = sequelize