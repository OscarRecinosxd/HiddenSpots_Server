const express = require("express")

const router = express.Router()
const validateToken = require("../utils/auth")
const hiddenSpotsController = require("../controllers/hiddenSpotsController")

//get para todos los hidden spots
router.get("/hidden-spots",hiddenSpotsController.getHiddenSpots)

//get para hidden spot especifico
router.get("/:id",hiddenSpotsController.getHiddenSpot)

//post para crear hidden spot
router.post("/create-hidden-spot",hiddenSpotsController.postCreateHiddenSpot)

//Actualizar hidden spot
router.patch("/update-hidden-spot/:id",hiddenSpotsController.updateHiddenSpot)

//Borrar hidden spot
router.delete("/delete-hidden-spot/:id",hiddenSpotsController.postDeleteHiddenSpot)

module.exports = router