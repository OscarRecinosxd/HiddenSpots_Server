const tourismCategory = require("../models/category")
const phisicalConditions = require("../models/phisicalCondition")

exports.getPhisicalConditions = async (req, res) => {
    try {
        const conditions = await phisicalConditions.findAll()
        res.status(200).json(conditions)

    } catch (error) {
        res.status(400).json({result :"something went wrong!"})
    }

}

exports.getTourismCategory = async (req, res) => {
    try {
        const categories = await tourismCategory.findAll()
        res.status(200).json(categories)

    } catch (error) {
        res.status(400).json({result :"something went wrong!"})
    }

}
