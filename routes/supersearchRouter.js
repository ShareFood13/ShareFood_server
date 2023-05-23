const express = require('express')
const router = express.Router()

const superSearchController = require('../DL/controllers/superSearchController.js')

const { auth } = require('../middleware/auth.js')

router.post('/:search', auth, superSearchController.superSearch)

module.exports = router