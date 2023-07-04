const express = require("express")
const router = express.Router()
const auxController = require("../controllers/auxController");


//get para condicion fisica
router.get("/phisical-condition", auxController.getPhisicalConditions);

//get para categoria de turismo
router.get("/tourism-categories", auxController.getTourismCategory);

module.exports = router


