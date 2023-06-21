const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");

//CRUD

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

exports.getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ result: "Something went wrong" });
    });
};

//CREATE
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

//UPDATE
exports.updateUser = (req, res) => {
  const userId = req.body.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const rolId = req.body.rol;
  let savedUser;

  User.findByPk(userId)
    .then((userToUpdate) => {
      userToUpdate.username = username;
      userToUpdate.email = email;
      userToUpdate.password = password;
      userToUpdate.rol = rolId;
      //Falta verificar que no de error el save
      if (username && email && password && rolId) {
        userToUpdate.save();
        savedUser = userToUpdate;
      } else {
        savedUser = null;
      }
    })
    .then(() => {
      if (savedUser) {
        return res.status(200).json(savedUser);
      }
      return res.status(400).json({ err: "Something went wrong" });
    })
    .catch(() => {
      res.status(400).json({ err: "Something went wrong" });
    });
};

//DEACTIVATE
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

//FIND ALL ROLES
exports.getRoles = (req, res) => {
  Role.findAll()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      res.status(400).json({ result: "Something went wrong" });
    });
};
