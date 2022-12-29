const mongoose = require("mongoose")

const PostMyMail = require('../models/myMailsModel.js')

// const userModel = require("../models/userModel")

const createMyMail = async (req, res) => {

    const myMail = req.body

    console.log(myMail);
    try {

        const newMyMail = new PostMyMail({ ...myMail })

        const result = await newMyMail.save()

        // const result2 = await userModel.findByIdAndUpdate(myMail.reciverId, { $push: { myMailsId: result._id } })

        console.log("result", result)
        // console.log("result2", result2)

        res.status(201).json({ myMail: result, message: "Mail Sended!!!" })
    } catch (error) {
        res.status(409).json({ message: "createMyMail failed!!!" })
    }
}

const getMyMails = async (req, res) => {

    const { id } = req.params

    console.log(id);

    try {
        const myMails = await PostMyMail.find({ reciverId: id })

        res.status(200).json({ myMails: myMails })

    } catch (error) {
        res.status(404).json({ message: "getMyMails failure" })
    }
}

const getSendedMails = async (req, res) => {

    const { id } = req.params

    console.log(id);

    try {
        const sendedMails = await PostMyMail.find({ senderId: id })

        res.status(200).json({ sendedMails: sendedMails })

    } catch (error) {
        res.status(404).json({ message: "getSendedMails failure" })
    }
}

const delMyMail = async (req, res) => {

    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Mail with That ID")

        await PostMyMail.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

        res.status(200).json({ message: "Mail deleted!!!" })
    } catch (error) {
        res.status(404).json({ message: "delMyMail failure" })
    }
}

module.exports = { createMyMail, getMyMails, getSendedMails, delMyMail }