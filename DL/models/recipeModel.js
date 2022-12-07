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
    recipePicture: [{
        base64: { type: String },
        path: { type: String },
    }],
    prepTime: {
        type: Number,
    },
    cookTime: {
        type: Number,
    },
    difficulty: {
        type: String,
    },
    forHowMany: {
        type: Number,
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
        enum: ['private', 'public'],
    },
    freeText: {
        type: String,
    },
    recipeComments: [{
        commentCreator: String,
        comment: {
            type: String,
            required: true
        }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }

})

const PostRecipe = mongoose.model("PostRecipe", recipeSchema)
module.exports = PostRecipe