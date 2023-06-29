const express = require("express")

const router = express.Router()
const validateToken = require("../utils/auth")
const hiddenSpotsController = require("../controllers/hiddenSpotsController")


router.get("/hidden-spots",hiddenSpotsController.getHiddenSpots)

router.get("/:id",hiddenSpotsController.getHiddenSpot)

router.post("/create-hidden-spot",hiddenSpotsController.postCreateHiddenSpot)

router.patch("/update-hidden-spot/:id",hiddenSpotsController.updateHiddenSpot)

router.delete("/delete-hidden-spot/:id",hiddenSpotsController.postDeleteHiddenSpot)

module.exports = router