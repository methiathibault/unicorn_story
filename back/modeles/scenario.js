const sequelize = require("../database/database.js")
const {DataTypes} = require("sequelize")
const history = require("./history")

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

scenario.belongsTo(history,{foreignKey:'storyId'});
history.hasMany(scenario, {foreignKey: 'storyId',});
module.exports = scenario;

