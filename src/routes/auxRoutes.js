const express = require("express")

const router = express.Router()

const auxController = require("../controllers/auxController");


router.get("/phisical-condition", auxController.getPhisicalConditions);

router.get("/tourism-categories", auxController.getTourismCategory);

module.exports = router


