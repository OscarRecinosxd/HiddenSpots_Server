const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const Role = require("./role");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resetToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetTokenExpiration: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

Role.hasOne(User, {
  foreignKey: {
    name: "rol",
    defaultValue: 2,
    //todo change this to false
    allowNull: true
  },
});

module.exports = User;
