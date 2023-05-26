const Sequelize = require('sequelize');
const sequelize = require('../utils/db_con.js');

const TaskModel = sequelize.define('tasks',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING,
    description:Sequelize.STRING,
    status:Sequelize.TINYINT
})

module.exports = TaskModel;