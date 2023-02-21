const mongoose = require("mongoose")

const PostEvent = require('../models/eventModel.js')

const userModel = require("../../DL/models/userModel")

const createEvent = async (req, res) => {

    const event = req.body

    try {

        const newEvent = new PostEvent({ ...event })

        const result = await newEvent.save()

        await userModel.findByIdAndUpdate(event.creatorId, { $push: { eventsId: { $each: [result._id] } } })

        const myEvents = await PostEvent.find({ creatorId: event.creatorId })

        res.status(201).json({ events: myEvents, message: "👍 Event Created!!!" })
    } catch (error) {

        res.status(409).json({ message: error.message })
    }
}

const getEvents = async (req, res) => {

    const { id } = req.params

    try {

        const myEvents = await PostEvent.find({ creatorId: id })//.populate('recipesId')

        res.status(200).json({ events: myEvents })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const updateEvent = async (req, res) => {

    const { _id } = req.body

    try {

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Event with That ID")

        const updatedEvent = { ...req.body, _id: _id }

        await PostEvent.findByIdAndUpdate(_id, updatedEvent, { new: true })

        const myEvents = await PostEvent.find({ creatorId: _id })

        res.status(200).json({ events: myEvents, message: "👍 Event Updated!!!" })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const delEvent = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with That ID")

    try {

        const result = await PostEvent.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

        await userModel.findByIdAndUpdate(result.creatorId, { $pull: { eventsId: result._id } })

        const myEvents = await PostEvent.find({ creatorId: _id })

        res.status(200).json({ events: myEvents, message: "👍 Event deleted successfully" })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
}

module.exports = { createEvent, getEvents, updateEvent, delEvent }