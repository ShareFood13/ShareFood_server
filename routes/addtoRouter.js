const express = require('express')
const router = express.Router()

const addtoController = require('../DL/controllers/addtoController.js')

const { auth } = require('../middleware/auth.js')

router.put("/", auth, addtoController.addRecipeTo)


module.exports = router