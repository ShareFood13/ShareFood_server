const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectId;


const PostMyMail = require('../models/myMailsModel.js')

// const userModel = require("../models/userModel")

const createMyMail = async (req, res) => {

    const { mail } = req.body

    try {

        // const newMyMail = new PostMyMail(mail)


        // const result2 = await PostMyMail.createIndex({ createdAt: 1 }, { expireAfterSeconds: 5 })

        // console.log(result2)

        const result = await PostMyMail.insertMany(mail)
        // console.log(result)
        const myMails = await PostMyMail.find({ reciverId: result.reciverId })

        // const result = await newMyMail.save()

        // const result2 = await userModel.findByIdAndUpdate(myMail.reciverId, { $push: { myMailsId: result._id } })

        res.status(201).json({ myMails: myMails, message: "👍 Mail Sent!!!" })
    } catch (error) {
        // res.status(409).json({ message: "👎 createMyMail failed!!!" })
        console.log(error)
    }
}

const getMyMails = async (req, res) => {

    const { id } = req.params

    // console.log(id);

    try {
        const myMails = await PostMyMail.find({ reciverId: id })
        // console.log("myMails", myMails);

        res.status(200).json({ myMails: myMails })

    } catch (error) {
        res.status(404).json({ message: "👎 getMyMails failure" })
    }
}

const getSendedMails = async (req, res) => {

    const { id } = req.params

    // console.log(id);

    try {
        const sendedMails = await PostMyMail.find({ senderId: id })

        res.status(200).json({ sendedMails: sendedMails })

    } catch (error) {
        res.status(404).json({ message: "👎 getSendedMails failure" })
    }
}

const delMyMail = async (req, res) => {

    const { id } = req.params
    const listToDelete = req.body
    // console.log(listToDelete)
    // try {

    const objectIds = listToDelete.map(id => new ObjectId(id));

    console.log({ objectIds })

    PostMyMail.deleteMany({ _id: { $in: objectIds } }, async function (err, result) {
        if (err) throw res.status(404).json({ message: "👎 Delete mail failure" });
        console.log(`Deleted ${result.deletedCount} documents`);
        const myMails = await PostMyMail.find({ reciverId: id })
        console.log({ myMails })
        result.deletedCount > 1
            ? res.status(200).json({ myMails: myMails, message: `👍 Deleted ${result.deletedCount} mails` })
            : res.status(200).json({ myMails: myMails, message: `👍 Deleted ${result.deletedCount} mail` })
    })
}

const mailView = async (req, res) => {

    const { id } = req.params

    try {

        // await PostMyMail.createIndex({ date: 1 }, { expireAfterSeconds: 5 })

        await PostMyMail.findByIdAndUpdate(id, { isOpen: true }, { new: true })

        // const myMails = await PostMyMail.find({ reciverId: id })

        // console.log(myMails)

        // res.status(200).json({ myMails: myMails })
        res.status(200).json({ message: "👍" })
    } catch (error) {

        res.status(404).json({ message: "👎 Error" })
    }

}

module.exports = { createMyMail, getMyMails, getSendedMails, delMyMail, mailView }