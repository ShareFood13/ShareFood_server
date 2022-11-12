const express = require('express')
const router = express.Router()

const usersRouter = require("./usersRouter")
const recipeRouter = require("./recipesRouter")

router.use("/user", usersRouter)
router.use("/recipes", recipeRouter)

module.exports = router