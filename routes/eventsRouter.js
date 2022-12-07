const express = require('express')
const router = express.Router()

const eventsController = require('../DL/controllers/eventsController.js')

const { auth } = require('../middleware/auth.js')

router.post('/', auth, eventsController.createEvent)
router.get('/:id', auth, eventsController.getEvents)
router.patch("/", auth, eventsController.updateEvent)
router.delete("/:id", auth, eventsController.delEvent)

module.exports = router