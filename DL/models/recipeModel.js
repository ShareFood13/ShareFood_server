const mongoose = require('mongoose')

// const userModel = require("../../DL/models/userModel")

const recipeSchema = new mongoose.Schema({
    creatorId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: userModel,
        type: String,
        required: true
    },
    creator: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    recipeName: {
        type: String,
        required: true
    },
    // recipePicture: [{
    //     base64: { type: String },
    //     path: { type: String },
    // }],
    recipePicture: {
        normal: [String],
        small: [String]
    },
    prepTime: {
        type: String,
    },
    cookTime: {
        type: String,
    },
    difficulty: {
        type: String,
    },
    forHowMany: {
        type: String,
    },
    specialDiet: [
        String
    ],
    tags: [String],
    ingredients: [{
        product: String,
        quantity: Number,
        units: String,
        remarks: String,
    }],
    preparation: [{
        step: String,
        preparation: String,
    }],
    likes: {
        type: [String],
        default: [],
    },
    downloads: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        enum: ['Private', 'Public'],
    },
    foodCourse: {
        type: String,
    },
    freeText: {
        type: String,
    },
    // recipeComments: [{
    //     commentCreator: String,
    //     comment: {
    //         type: String,
    //     }
    // }],
    isDeleted: {
        type: Boolean,
        default: false
    }

})

const PostRecipe = mongoose.model("PostRecipe", recipeSchema)
module.exports = PostRecipe