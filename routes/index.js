const express = require('express')
const router = express.Router()

const usersRouter = require("./usersRouter")
const recipeRouter = require("./recipesRouter")
const eventRouter = require("./eventsRouter")
const addtoRouter = require("./addtoRouter")
const mealRouter = require("./mealRouter")
const mymailRouter = require("./mymailRouter")
const calorieninjas = require("./calorieninjas")
const shopListRouter = require("./shopListRouter")
const superSearchRouter = require("./supersearchRouter")

router.use("/user", usersRouter)
router.use("/recipes", recipeRouter)
router.use("/events", eventRouter)
router.use("/addto", addtoRouter)
router.use("/meals", mealRouter)
router.use("/mymails", mymailRouter)
router.use("/calorieninjas", calorieninjas)
router.use("/shoplist", shopListRouter)
router.use("/supersearch", superSearchRouter)

module.exports = router