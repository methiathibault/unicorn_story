const sequelize = require("../database/database.js")
const {DataTypes} = require("sequelize")


const history = sequelize.define("history",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    freezeTableName: true
})


module.exports = history;

