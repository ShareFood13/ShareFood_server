const express = require('express')
const router = express.Router()

const usersRouter = require("./usersRouter")

router.use("/user", usersRouter)

module.exports = router