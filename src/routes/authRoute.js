const express = require("express")

const router = express.Router()

const authController = require("../controllers/authController");


//Logeo de usuario
router.post("/login", authController.sendLogin);
router.post("/signup", authController.signUp);
router.post("/request-password", authController.requestPassword);
router.patch("/reset-password/:token", authController.resetPassword);

module.exports = router