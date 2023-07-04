const express = require("express")

const router = express.Router()
const validateToken = require("../utils/auth")
const adminController = require("../controllers/adminController")

//Obtener todos los usuarios
router.get("/users",adminController.getUsers)

//Obtener todos los roles
router.get("/roles",adminController.getRoles)

//Obtener solo 1 usuario
router.get("/:id", adminController.getUser)

//Guardar 1 usuario
router.post("/save-user", adminController.createUser)

//Actualizar usuario 
router.patch("/update-user/:id", adminController.updateUser)

//Elimiar usuario
router.patch("/deactivate/:id",adminController.deleteUser)


module.exports = router