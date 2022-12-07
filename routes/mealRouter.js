const express = require('express')
const router = express.Router()

const mealsController = require('../DL/controllers/mealController.js')

const { auth } = require('../middleware/auth.js')

router.post('/', auth, mealsController.createMeal)
router.get('/:id', auth, mealsController.getMeals)
router.patch("/:_id", auth, mealsController.updateMeal)
router.delete("/:_id", auth, mealsController.delMeal)

module.exports = router