const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");

//Controllador para obtener usuario
exports.getUser = (req, res) => {
  console.log(req.params.id);
  User.findByPk(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(200).json({ result: "Theres no username" });
      }
    })
    .catch((err) => {
      res.status(400).json({ result: "Something went wrong" });
    });
};

//Controllador para obtener todos los usuarios
exports.getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ result: "Something went wrong" });
    });
};

//Controllador para crear usuario
exports.createUser = async (req, res) => {
  console.log("BODY", req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const role = req.body.role;

  if (password !== confirm_password) {
    return res.status(400).json({ result: "Passwords don't match" });
  }

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT)
  );

  User.create({
    username: username.toLowerCase(),
    email: email,
    password: hashedPassword,
    isActive: true,
    roleId: role,
  })
    .then(() => {
      console.log("Usuario creado");
      res.status(201).json({ result: "Success!" });
    })
    .catch(() => {
      console.log("ERROR");
      res.status(400).json({ result: "Something went wrong" });
    });
};

//Controllador para actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const newInfo = req.body;
    let userToUpdate = await User.findByPk(userId);

    if (!userToUpdate) {
      return res.status(404).json({ result: "Something went wrong" });
    }

    await userToUpdate.update(newInfo);
    await userToUpdate.save();
    return res.status(200).json({ result: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ result: "Something went wrong" });
  }
};

//Controllador para desactivar usuario
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  const userToDeactivate = await User.findByPk(userId);

  if (!userToDeactivate) {
    return res.status(400).json({ result: "Something went wrong" });
  }

  const actualStatus = userToDeactivate.isActive;

  userToDeactivate.isActive = !actualStatus;
  await userToDeactivate.save();

  return res.status(200).json({ result: "User updated successfully" });
};

//Controllador para obtener todos los roles
exports.getRoles = (req, res) => {
  Role.findAll()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      res.status(400).json({ result: "Something went wrong" });
    });
};
