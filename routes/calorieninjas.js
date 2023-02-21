const express = require('express')
const router = express.Router()

const nutritionController = require('../DL/controllers/nutritionController.js')

const { auth } = require('../middleware/auth.js')

router.post('/', nutritionController.postIngredient)
router.get('/:ingredient', nutritionController.getNutrition)

module.exports = router