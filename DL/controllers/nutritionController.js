const mongoose = require("mongoose")

// const PostMyMail = require('../models/myMailsModel.js')

// const userModel = require("../models/userModel")
const nutritionLogic = require("../../BL/nutritionLogic")

const getNutrition = async (req, res) => {
    const { ingredient } = req.params
    // console.log(ingredient)
    try {

        // console.log("/search params", req.params);
        const result = await nutritionLogic.search(ingredient);

        console.log("getNutrition res", result);
        postIngredient(result)
        res.status(200).send(result);

    } catch (error) {
        res.status(500).send("/search something went wrong");
    }
}

const postIngredient = async (data) => {
    console.log(data.items[0])

    await nutritionLogic.postIngredient(data);

}




module.exports = { getNutrition, postIngredient }