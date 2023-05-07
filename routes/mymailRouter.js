const express = require('express')
const router = express.Router()

const myMailsController = require('../DL/controllers/myMailsController.js')

const { auth } = require('../middleware/auth.js')

router.post('/', auth, myMailsController.createMyMail)
router.get('/:id', auth, myMailsController.getMyMails)
router.put('/:id', auth, myMailsController.delMyMail)
router.put('/mailView/:id', auth, myMailsController.mailView)

module.exports = router