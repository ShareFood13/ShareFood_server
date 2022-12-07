const mongoose = require("mongoose")

const PostEvent = require('../models/eventModel.js')
const PostMeal = require('../models/mealModel.js')

const addRecipeTo = async (req, res) => {
    console.log('====================================');
    console.log("addRecipeTo", req.body);
    console.log('====================================');

    const { item, addTo } = req.body

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with That ID")

    try {
        if (addTo === 'event') {
            await PostEvent.findByIdAndUpdate(item._id, { ...item }, { new: true })
        } else {
            await PostMeal.findByIdAndUpdate(item._id, { ...item }, { new: true })
        }
        res.status(200).json({ message: "Recipe Added successfully" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = { addRecipeTo }