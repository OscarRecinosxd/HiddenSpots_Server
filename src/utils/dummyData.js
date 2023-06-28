const bcrypt = require('bcrypt');
const Role = require("../models/role");
const Category = require("../models/category");
const PhisicalCondition = require("../models/phisicalCondition");
const User = require("../models/user");
const HiddenSpot = require("../models/hiddenSpot");

const insertDummyData = async () => {
  console.log("PRUEBA");
  const role1 = new Role({ name: "admin" });
  const role2 = new Role({ name: "usuario" });

  await role1.save();
  console.log("Rol 1 guardado");
  await role2.save();
  console.log("Rol 2 guardado");

  /*role1
      .save()
      .then(() => {
        role2.save();
      })
      .then(() => {
        console.log("GUARDADOOOOOOOOOOOOOOOOOOOOOOOOOO");
        return;
      })
      .catch((err) => {
        console.log(err);
    });*/

  const category1 = new Category({ name: "Gubernamental" });
  const category2 = new Category({ name: "Privado" });
  const category3 = new Category({ name: "Comunitario" });

  await category1.save();
  console.log("Categoria 1 guardado");
  await category2.save();
  console.log("Categoria 2 guardada");
  await category3.save();
  console.log("Categoria 3 guardada");

  const condition1 = new PhisicalCondition({ name: "Baja" });
  const condition2 = new PhisicalCondition({ name: "Media" });
  const condition3 = new PhisicalCondition({ name: "Alta" });

  await condition1.save();
  console.log("condicion 1 guardada");
  await condition2.save();
  console.log("condicion 2 guardada");
  await condition3.save();
  console.log("condicion 3 guardada");

  const hashedPassword = await bcrypt.hash("123",parseInt(process.env.SALT))

  const user = new User({
    username: "admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    isActive: true,
    roleId: 1
  })

  await user.save();

  const hiddenSpot = new HiddenSpot({
    name: "Prueba",
    description: "Este es un hidden spot de prueba",
    location: { type: "Point", coordinates: [-89.235237, 13.670049] },
    tourismcategoryId : 1,
    phisicalconditiontypeId:1,
    userId: 1,
  }
  
  );

  await hiddenSpot.save()


};

    

module.exports = insertDummyData;
