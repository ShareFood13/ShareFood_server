const mongoose = require('mongoose')

const PostRecipe = require('../models/recipeModel.js')

const mealSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    mealName: {
        type: String,
        required: true
    },
    specialDiet: [
        String
    ],
    tags: [
        String
    ],
    recipesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: PostRecipe,
    }],
    freeText: { type: String },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Private', 'Public'],
    },
})

const PostMeal = mongoose.model("PostMeal", mealSchema)
module.exports = PostMeal