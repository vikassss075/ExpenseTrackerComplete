const { timeStamp } = require('node:console');
const sequelize = require('../utils/db-connection');
const {DataTypes} = require('sequelize');

const expense = sequelize.define('expense', {
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type:DataTypes.STRING,
        allowNull: false
    },
    category:{
        type:DataTypes.STRING,
        allowNull: false
    }
},)

module.exports = 
    expense
