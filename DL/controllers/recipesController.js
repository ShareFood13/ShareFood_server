const mongoose = require("mongoose")

const PostRecipe = require('../models/recipeModel.js')

const userModel = require("../../DL/models/userModel")

const createRecipe = async (req, res) => {

    const recipe = req.body

    try {

        const newRecipe = new PostRecipe({ ...recipe })

        const result = await newRecipe.save()

        await userModel.findByIdAndUpdate(recipe.creatorId, { $push: { recipesId: { $each: [result._id] } } })//, $position: 0 

        const myRecipes = await PostRecipe.find({ creatorId: recipe.creatorId })

        res.status(201).json({ recipes: myRecipes, message: "👍 Recipe Created!!!" })
    } catch (error) {

        res.status(409).json({ message: error.message })
    }
}

const getMyRecipes = async (req, res) => {

    const { id } = req.params

    try {

        const myRecipes = await PostRecipe.find({ creatorId: id })

        res.status(200).json({ recipes: myRecipes })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const updateRecipe = async (req, res) => {

    const { id } = req.params

    try {

        const updatedRecipe = { ...req.body, _id: id }

        await PostRecipe.findByIdAndUpdate(id, updatedRecipe, { new: true })

        const myRecipes = await PostRecipe.find({ creatorId: id })

        res.status(200).json({ recipes: myRecipes, message: "👍 Recipe Updated!!!" })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const delRecipe = async (req, res) => {

    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No Post with That ID !!!" })

        const result = await PostRecipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

        await userModel.findByIdAndUpdate(result.creatorId, { $pull: { recipesId: result._id } })

        const myRecipes = await PostRecipe.find({ creatorId: id })

        res.status(200).json({ recipes: myRecipes, message: "👍 Recipe Deleted!!!" })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const getOtherRecipes = async (req, res) => {

    try {

        const otherRecipes = await PostRecipe.find({}).sort({ date: -1 })

        console.log("getOtherRecipes otherRecipes", otherRecipes)

        res.status(200).json({ otherRecipes })
    } catch (error) {

        res.status(500).json({ message: "👎 Something went wrong!!!" })
    }
}

module.exports = { createRecipe, getMyRecipes, updateRecipe, delRecipe, getOtherRecipes }

    // const userInfo = await userModel.findOne({ _id: recipe.creatorId })//.populate('eventsId').populate('mealsId').populate('recipesId')
    // console.log("userInfo", userInfo)