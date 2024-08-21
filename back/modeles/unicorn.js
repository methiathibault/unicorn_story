const sequelize = require('../database/database');
const { DataTypes } = require('sequelize')

const unicorn = sequelize.define('unicorn', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    strenght: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    agility: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    intelligence: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true
});

module.exports = unicorn