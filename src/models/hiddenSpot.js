const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Category = require("./category");
const PhisicalCondition = require("./phisicalCondition");

//Tabla de hidden spot
const HiddenSpot = sequelize.define("hiddenspot", {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  location: {
    type: Sequelize.GEOGRAPHY("POINT"),
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
});

//Relaciones que tiene un hidden spot
Category.hasMany(HiddenSpot);
HiddenSpot.belongsTo(Category);
PhisicalCondition.hasMany(HiddenSpot);
HiddenSpot.belongsTo(PhisicalCondition);

module.exports = HiddenSpot;
