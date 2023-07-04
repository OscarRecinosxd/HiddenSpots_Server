const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

//Tabla de rol
const Role = sequelize.define("role", {
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
},{ timestamps: false });

module.exports = Role;
