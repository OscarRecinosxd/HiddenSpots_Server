require('dotenv').config();
const { Sequelize } = require("sequelize");

//Configuracion para la conexion a la base de datos
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_USER_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect:process.env.SEQUELIZE_DIALECT,
    port: process.env.DATABASE_PORT,
  }
);

sequelize
  .authenticate()
  .then((result) => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
