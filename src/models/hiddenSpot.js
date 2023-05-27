const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const HiddenSpot = sequelize.define("hiddenspot",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location:{
        type: Sequelize.GEOGRAPHY('POINT'),
        allowNull: false,
    }
})

module.exports = HiddenSpot