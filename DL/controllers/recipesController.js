const PostRecipe = require('../models/recipeModel.js')


const createRecipe = async (req, res) => {
    const recipe = req.body

    const newRecipe = new PostRecipe({ ...recipe })
    try {
        await newRecipe.save()
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const getMyRecipes = async (req, res) => {
    console.log('====================================');
    console.log("getMyRecipes", req.params);
    console.log('====================================');
    const { id } = req.params
    try {
        const myRecipes = await PostRecipe.find({ creatorId: id })

        res.status(200).json(myRecipes)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateRecipe = async (req, res) => {
    console.log('====================================');
    console.log("updateRecipe", req.body);
    console.log('====================================');
}

const delRecipe = async (req, res) => {
    console.log('====================================');
    console.log("delRecipe", req.body);
    console.log('====================================');
}

module.exports = { createRecipe, getMyRecipes, updateRecipe, delRecipe }