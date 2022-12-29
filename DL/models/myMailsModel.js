const mongoose = require('mongoose')

// const userModel = require("../../DL/models/userModel")

const myMailsSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    reciverId: {
        type: String,
        required: true
    },
    reciverName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

})

const MyMailsSchema = mongoose.model("MyMailsSchema", myMailsSchema)
module.exports = MyMailsSchema