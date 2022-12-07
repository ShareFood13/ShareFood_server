const mongoose = require("mongoose")

const PostRecipe = require('../models/recipeModel.js')

const userModel = require("../../DL/models/userModel")

const createRecipe = async (req, res) => {

    const recipe = req.body

    try {

        const newRecipe = new PostRecipe({ ...recipe })

        const result = await newRecipe.save()

        await userModel.findByIdAndUpdate(recipe.creatorId, { $push: { recipesId: result._id } })

        res.status(201).json(result)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const getMyRecipes = async (req, res) => {

    const { id } = req.params

    try {
        const myRecipes = await PostRecipe.find({ creatorId: id })

        res.status(200).json(myRecipes)

    } catch (error) {
        res.status(404).json({ message: "getMyRecipes failure" })
    }
}

const updateRecipe = async (req, res) => {

    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with That ID")

        const updatedRecipe = { ...req.body, _id: id }

        const result = await PostRecipe.findByIdAndUpdate(id, updatedRecipe, { new: true })

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: "updateRecipe failure" })
    }
}

const delRecipe = async (req, res) => {

    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with That ID")

        await PostRecipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

        res.status(200).json({ message: "Recipe deleted!!!" })
    } catch (error) {
        res.status(404).json({ message: "delRecipe failure" })
    }
}

module.exports = { createRecipe, getMyRecipes, updateRecipe, delRecipe }