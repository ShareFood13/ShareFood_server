const mongoose = require("mongoose")

const ShopList = require('../models/ShopListModel.js')

const saveShopList = async (req, res) => {

    const { list, shopListName, userId } = req.body

    try {

        const newShopList = new ShopList({ ...req.body })

        const result = await newShopList.save()
        // console.log("saveShopList", result)
        // await userModel.findByIdAndUpdate(meal.creatorId, { $push: { mealsId: { $each: [result._id] } } })

        const myShopLists = await ShopList.find({ userId: userId })

        res.status(201).json({ shopLists: myShopLists, message: "👍 Shop List Created!!!" })
    } catch (error) {

        res.status(409).json({ message: error.message })
    }
}

const updateShopList = async (req, res) => {

    const updatedShopList = req.body
    const { _id } = req.params
    const { list, shopListName, userId } = req.body

    // console.log("shopListController updateShopList", updatedShopList, _id, userId)

    try {

        // if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Meal with That ID")

        // const updatedMeal = { ...req.body, _id: _id }

        const result = await ShopList.findByIdAndUpdate(_id, updatedShopList, { new: true })
        console.log("result", result)
        const myShopLists = await ShopList.find({ userId: userId })

        res.status(200).json({ shopLists: myShopLists, message: "👍 Shop List Updated!!!" })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
}

const getAllShopList = async (req, res) => {

    const { _id } = req.params
    // console.log("shopListController getAllShopList", _id)

    try {
        const myShopLists = await ShopList.find({ userId: _id })
        // console.log("shopListController getAllShopList", myShopLists)

        res.status(200).json({ shopLists: myShopLists })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const getShopList = async (req, res) => {

    const { listId } = req.params
    // console.log("shopListController getShopList", listId)

    // try {
    //     const myMeals = await PostMeal.find({ creatorId: id })//.populate("recipesId")

    //     res.status(200).json({ meals: myMeals })

    // } catch (error) {

    //     res.status(404).json({ message: error.message })
    // }
}

const delShopList = async (req, res) => {

    const { listId } = req.params
    // console.log("shopListController delShopList", listId)

    // if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with That ID")

    try {

        // const result = await PostMeal.findByIdAndUpdate(_id, { isDeleted: true }, { new: true })

        // await userModel.findByIdAndUpdate(result.creatorId, { $pull: { mealsId: result._id } })

        const result = await ShopList.find({ _id: listId })

        await ShopList.findByIdAndRemove(listId)

        const myShopLists = await ShopList.find({ userId: result[0].userId })

        res.status(200).json({ shopLists: myShopLists, message: "👍 Shop List deleted successfully" })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
}


module.exports = { saveShopList, updateShopList, getAllShopList, getShopList, delShopList }