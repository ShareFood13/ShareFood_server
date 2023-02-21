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
        enum: ['Private', 'Public'],
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
    profile: {
        name: String,
        userName: String,
        birthDate: String,
        email: String,
        phone: {
            countryCode: String,
            phoneNumber: String,
        },
        gender: String,
        globalStatus: String,
        dietaryRestrictions: [String],
        profession: String,
        favoriteFood: String,
        favoriteRestaurants: String,
        cookingSkills: String,
        mealPreferences: String,
        foodInterests: String,
        personalDescription: String,
        profilePicture: {
            path: String,
            base64: String,
        },
        backgroundPicture: {
            path: String,
            base64: String,
        },
        fullAddress: {
            address: String,
            addNumber: String,
            country: String,
            zipCode: String,
        },
        socialMediaHandles: {
            instagram: String,
            tiktok: String,
            facebook: String,
            pinterest: String,
            blog: String
        },
        following: [String],
        followers: [String]
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User