const sequelize = require("../database/database.js")
const {DataTypes} = require("sequelize")
const Scenario = require("./scenario")

const choice = sequelize.define("choice",{
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
    consequence:{
        type:DataTypes.STRING(1000),
        allowNull:false,
    },
    statImpact:{
        type:DataTypes.JSON,
        allowNull:true,
    },
    statRequirement:{
        type:DataTypes.JSON,
        allowNull:true,
    }
},{
    sequelize,
    freezeTableName: true
})


choice.belongsTo(Scenario,{foreignKey:"nextScenarId",onDelete:"cascade"});
Scenario.hasMany(choice, {foreignKey: 'nextScenarId',onDelete:"cascade"});

choice.belongsTo(Scenario,{foreignKey:'scenarId',onDelete:"cascade"});
Scenario.hasMany(choice,{foreignKey:'scenarId',onDelete:"cascade"});



module.exports = choice;

