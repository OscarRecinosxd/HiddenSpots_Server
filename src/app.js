require("dotenv").config();
const Express = require("express");
const database = require("./utils/database");
const User = require("./models/user");
const { expressjwt } = require("express-jwt");
const app = Express();
const adminRoutes = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoute");
const hiddeSpotsRoutes = require("./routes/hiddenSpotsRoute");
const cors = require("cors");
const Role = require("./models/role");
const insertDummyData = require("./utils/dummyData");
app.use(cors());
app.use(Express.json());
app.use(
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: process.env.JWT_SECRET,
  })
);

app.use("/admin", adminRoutes);

app.use(authRoutes);
app.use("/spots", hiddeSpotsRoutes);

app.get("/", (req, res, next) => {
  res.send({ title: "Hola" });
});


database
  //.sync({ force: true })
  //.sync({alter : true})
  .sync()
  .then(async(result) => {
    //await insertDummyData()
    console.log("Se cargo la base de datos");
    console.log("------------------------------");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT);
