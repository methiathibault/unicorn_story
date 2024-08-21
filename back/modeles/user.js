const sequelize = require('../database/database.js');
const { DataTypes } = require('sequelize')

const user = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true
});


module.exports = user;