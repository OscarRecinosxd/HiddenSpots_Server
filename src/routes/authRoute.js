const express = require("express")

const router = express.Router()

const authController = require("../controllers/authController");


//Logeo de usuario
router.post("/login", authController.sendLogin);
//Nuevo usuario
router.post("/signup", authController.signUp);
//Recuperar contraseña
router.post("/request-password", authController.requestPassword);
router.patch("/reset-password/:token", authController.resetPassword);

module.exports = router