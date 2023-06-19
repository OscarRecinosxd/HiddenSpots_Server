const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const PhisicalCondition = sequelize.define("phisicalconditiontypes",{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique : true,
    }
})

module.exports = PhisicalCondition