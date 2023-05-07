const mongoose = require('mongoose')

const shopListSchema = new mongoose.Schema({
    list: [{
        _id: String,
        product: String,
        quantity: Number,
        remarks: String,
        units: String,
        isDone: {
            type: Boolean,
            default: false,
        }
    }],
    shopListName: String,
    userId: String,
    creationDate: {
        type: Date,
        default: Date.now
    },
})

const PostShopList = mongoose.model("PostShopList", shopListSchema)
module.exports = PostShopList