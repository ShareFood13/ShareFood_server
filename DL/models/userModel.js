const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    id: { type: String }
})

const User = mongoose.model("User", userSchema)
module.exports = User