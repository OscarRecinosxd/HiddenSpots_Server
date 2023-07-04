require("dotenv").config();
const Express = require("express");
const cloudinary = require("cloudinary");
const database = require("./utils/database");
const User = require("./models/user");
const { expressjwt } = require("express-jwt");
const app = Express();
const adminRoutes = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoute");
const hiddeSpotsRoutes = require("./routes/hiddenSpotsRoute");
const auxRoutes = require("./routes/auxRoutes")
const cors = require("cors");
const Role = require("./models/role");
const insertDummyData = require("./utils/dummyData");

app.use(cors());
app.use(Express.json());

//Configuracion para las imagenes
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Configuracion para el uso de authorizacion
app.use(
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: process.env.JWT_SECRET,
  })
);

//Mapeo de rutas
app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(auxRoutes)
app.use("/spots", hiddeSpotsRoutes);


//Conexion con la base de datos
database
  // .sync({ force: true })
  // .sync({alter : true})
  .sync()
  .then(async (result) => {
    // await insertDummyData()
    console.log("Se cargo la base de datos");
    console.log("------------------------------");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT);
