const mongoose = require("mongoose")

const PostEvent = require('../models/eventModel.js')
const PostMeal = require('../models/mealModel.js')

const userModel = require("../../DL/models/userModel")

const addRecipeTo = async (req, res) => {
    const { item, addTo } = req.body

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with That ID")


    try {
        if (addTo === 'event') {

            await PostEvent.findByIdAndUpdate(item._id, { ...item }, { new: true })
            // const userInfo = await userModel.findOne({ _id: item.creatorId })//.populate('eventsId').populate('mealsId').populate('recipesId')
            // console.log("userInfo addtoController event", userInfo)

            const myEvents = await PostEvent.find({ creatorId: item.creatorId })//.populate('recipesId')
            // console.log("userInfo addtoController meal", myEvents)

            res.status(200).json({ events: myEvents, message: `👍 Recipe Added successfully \nto ${item.eventName}` })

            // res.status(200).json({ recipe: userInfo, message: `Recipe Added successfully \nto ${item.eventName}` })

        } else {

            await PostMeal.findByIdAndUpdate(item._id, { ...item }, { new: true })
            // const userInfo = await userModel.findOne({ _id: item.creatorId })//.populate('eventsId').populate('mealsId').populate('recipesId')
            // console.log("userInfo addtoController meal", userInfo)

            const myMeals = await PostMeal.find({ creatorId: item.creatorId })
            // console.log("userInfo addtoController meal", myMeals)

            res.status(201).json({ meals: myMeals, message: `👍 Recipe Added successfully \nto ${item.mealName}` })

            // res.status(200).json({ recipe: userInfo, message: `👍 Recipe Added successfully \nto ${item.mealName}` })
        }

        // addTo === "meal"
        //     ? res.status(200).json({ recipe: userInfo, message: `Recipe Added successfully to ${item.eventName}` })
        //     : res.status(200).json({ recipe: userInfo, message: `Recipe Added successfully to ${item.mealName}` })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }

}

module.exports = { addRecipeTo }