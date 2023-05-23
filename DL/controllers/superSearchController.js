const mongoose = require("mongoose")

const userModel = require("../../DL/models/userModel")

const PostRecipe = require('../models/recipeModel.js')
const PostMeal = require('../models/mealModel.js')
const PostEvent = require('../models/eventModel.js')


const superSearch = async (req, res) => {
    var result = []
    const { foodCourses, sDiet } = req.body

    const { search } = req.params
    console.log("superSearch restrictions", search, foodCourses, sDiet)

    const filter = search.split("_")[0]
    const searchFor = search.split("_")[1]
    // console.log("superSearch filter", searchFor)
    switch (filter) {
        case "by":

            result = await userModel.find({ "userName": { $regex: searchFor, $options: "i" } })
            break;
        case "tag":
            var resultRec = await PostRecipe.find({
                "tags": { $regex: searchFor, $options: "i" },
                "isDeleted": false
            })
            var resultMeal = await PostMeal.find({
                "tags": { $regex: searchFor, $options: "i" },
                "isDeleted": false,
                "specialDiet": { $regex: sDiet, $options: "i" },
            })
            var resultEve = await PostEvent.find({
                "tags": { $regex: searchFor, $options: "i" },
                "isDeleted": false
            })
            result = [...resultRec, ...resultMeal, ...resultEve]
            break;
        case "recipe":

            result = await PostRecipe.find({
                "recipeName": { $regex: searchFor, $options: "i" },
                "isDeleted": false,
                "specialDiet": { $regex: sDiet, $options: "i" },
                "foodCourse": { $regex: foodCourses, $options: "i" },
            })
            break;
        case "meal":
            console.log("superSearch filter", searchFor)

            result = await PostMeal.find({
                "mealName": { $regex: searchFor, $options: "i" },
                "isDeleted": false,
                "specialDiet": { $regex: sDiet, $options: "i" },
            })
            break;
        case "event":
            result = "look for event"

            result = await PostEvent.find({
                "eventName": { $regex: searchFor, $options: "i" },
                "isDeleted": false
            })
            break;
        default:
            result = "look global"

    }
    //     try {

    //         const myRecipes = await PostRecipe.find({ creatorId: id })
    //         // const myRecipes = await PostRecipe.find({ creatorId: id },
    //         //     { recipeName: 1, likes: 1, specialDiet: 1, downloads: 1, prepTime: 1, cookTime: 1, "recipePicture.small": 1, _id: 1 })
    // console.log("getMyRecipes myRecipes",myRecipes)
    // res.status(200).json({ recipes: myRecipes })
    res.status(200).json({ search: result })
    //     } catch (error) {

    //         res.status(404).json({ message: error.message })
    //     }
}

module.exports = { superSearch }
