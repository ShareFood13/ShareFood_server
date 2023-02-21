const mongoose = require("mongoose")

const PostMeal = require('../models/mealModel.js')

const userModel = require("../../DL/models/userModel")

const createMeal = async (req, res) => {

    const { meal } = req.body

    try {

        const newMeal = new PostMeal({ ...meal })

        const result = await newMeal.save()

        await userModel.findByIdAndUpdate(meal.creatorId, { $push: { mealsId: { $each: [result._id] } } })

        const myMeals = await PostMeal.find({ creatorId: meal.creatorId })

        res.status(201).json({ meals: myMeals, message: "👍 Meal Created!!!" })
    } catch (error) {

        res.status(409).json({ message: error.message })
    }
}

const getMeals = async (req, res) => {

    const { id } = req.params

    try {
        const myMeals = await PostMeal.find({ creatorId: id })//.populate("recipesId")

        res.status(200).json({ meals: myMeals })

    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const updateMeal = async (req, res) => {

    const { _id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Meal with That ID")

        const updatedMeal = { ...req.body, _id: _id }

        await PostMeal.findByIdAndUpdate(_id, updatedMeal, { new: true })

        const myMeals = await PostMeal.find({ creatorId: _id })

        res.status(200).json({ meals: myMeals, message: "👍 Meal Updated!!!" })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
}

const delMeal = async (req, res) => {

    const { _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with That ID")

    try {

        const result = await PostMeal.findByIdAndUpdate(_id, { isDeleted: true }, { new: true })

        await userModel.findByIdAndUpdate(result.creatorId, { $pull: { mealsId: result._id } })

        const myMeals = await PostMeal.find({ creatorId: _id })

        res.status(200).json({ meals: myMeals, message: "👍 Meal deleted successfully" })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
}

module.exports = { createMeal, getMeals, updateMeal, delMeal }