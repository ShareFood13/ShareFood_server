const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    profileOwner: { //user._id
        type: String,
        required: true
    },
    about: { // ate 150 letras
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        city: { type: String, },
        country: { type: String, },
    },
    dateBirth: {
        type: String,
    },
    status: {
        type: String,
        enum: ['private', 'public'],
    },
    id: { type: String },
    gender: { type: String },
    profileLevel: { //????
        type: String,
        enum: ['homeCook', 'restaurantCook', 'restaurantChef', 'business'],
    },
    specialDiet: {
        type: String,
    },

})

const Profile = mongoose.model("Profile", profileSchema)
module.exports = Profile