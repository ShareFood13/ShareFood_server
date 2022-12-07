const mongoose = require('mongoose')

const PostMeal = require('../models/mealModel.js')
const PostEvent = require('../models/eventModel.js')
const PostRecipe = require('../models/recipeModel.js')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    isPermission: {
        type: Boolean,
        default: false,
        required: true,
    },
    status: {
        type: String,
        enum: ['private', 'public'],
    },
    mealsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: PostMeal,
    }],
    eventsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: PostEvent,
    }],
    recipesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: PostRecipe,
    }],
    id: { type: String },
    status: {
        type: String,
        enum: ['private', 'public'],
    },
})

const User = mongoose.model("User", userSchema)
module.exports = User