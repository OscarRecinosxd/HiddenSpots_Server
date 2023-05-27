const express = require("express")

const router = express.Router()
const validateToken = require("../utils/auth")
const adminController = require("../controllers/adminController")

//Obtener todos los usuarios
//
router.get("/users",/*validateToken, */adminController.getUsers)

//Obtener solo 1 usuario
router.get("/:id", adminController.getUser)

//Guardar 1 usuario
router.post("/save-user", adminController.createUser)

//Actualizar usuario 
router.post("/update-user", adminController.updateUser)

//Elimiar usuario
router.post("/delete-user",/*validateToken,*/adminController.deleteUser)


module.exports = router