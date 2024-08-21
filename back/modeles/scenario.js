const sequelize = require("../database/database.js")
const {DataTypes} = require("sequelize")
const story = require("./story")

const scenario = sequelize.define("scenario",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING(1000),
        allowNull:false,
    },
    difficulty:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    freezeTableName: true
})

scenario.belongsTo(story,{foreignKey:'storyId'});
story.hasMany(scenario, {foreignKey: 'storyId',});
module.exports = scenario;

