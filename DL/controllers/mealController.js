const mongoose = require("mongoose")

const PostMeal = require('../models/mealModel.js')

const userModel = require("../../DL/models/userModel")

const createMeal = async (req, res) => {

    const { meal } = req.body

    try {

        const newMeal = new PostMeal({ ...meal })

        const result = await newMeal.save()

        await userModel.findByIdAndUpdate(meal.creatorId, { $push: { mealsId: result._id } })

        res.status(201).json(result)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const getMeals = async (req, res) => {

    const { id } = req.params

    try {
        const myMeals = await PostMeal.find({ creatorId: id }).populate("recipesId")

        res.status(200).json(myMeals)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateMeal = async (req, res) => {

    const { _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Meal with That ID")

        const updatedMeal = { ...req.body, _id: _id }

        const result = await PostMeal.findByIdAndUpdate(_id, updatedMeal, { new: true })

        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const delMeal = async (req, res) => {

    const { _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with That ID")

    try {
        await PostMeal.findByIdAndUpdate(_id, { isDeleted: true }, { new: true })

        res.status(200).json({ message: "Meal deleted successfully" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { createMeal, getMeals, updateMeal, delMeal }