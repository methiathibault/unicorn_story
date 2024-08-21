const sequelize = require("../database/database.js")
const {DataTypes} = require("sequelize")


const story = sequelize.define("story",{
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


module.exports = story;

