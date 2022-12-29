const mongoose = require('mongoose')

const PostRecipe = require('../models/recipeModel.js')

const eventSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    eventName: {
        type: String,
        required: true
    },
    occasion: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    howManyGuests: {
        type: Number,
        required: true
    },
    recipesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: PostRecipe,
    }],
    alarm: {
        isAlarm: { type: Boolean },
        alarmDate: { type: String },
        alarmTime: { type: String },
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    freeText: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Private', 'Public'],
    },
})

const PostEvent = mongoose.model("PostEvent", eventSchema)
module.exports = PostEvent