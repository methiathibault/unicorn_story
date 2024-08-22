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
        allowNull:false,
    },
    statRequirement:{
        type:DataTypes.JSON,
        allowNull:false,
    }
},{
    sequelize,
    freezeTableName: true
})


choice.belongsTo(Scenario,{foreignKey:"nextScenarId"});
Scenario.hasMany(choice, {foreignKey: 'nextScenarId'});

choice.belongsTo(Scenario,{foreignKey:'scenarId'});
Scenario.hasMany(choice,{foreignKey:'scenarId'});



module.exports = choice;

