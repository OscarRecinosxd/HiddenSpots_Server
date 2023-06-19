const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Category = sequelize.define("tourismcategory",{
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



module.exports = Category