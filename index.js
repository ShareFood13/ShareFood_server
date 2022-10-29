require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limits: "30mb", extended: true }))
app.use(cors())
app.use(express.json())


PORT = process.env.PORT || 3000

const mainRouter = require('./routes/index')
app.use("/api", mainRouter)

require("./DL/db").connect()

app.listen(PORT, () => console.log(`Server is running at Port ${PORT}`))

// npm install morgan
// const morgan = require('morgan')
// app.use(morgan('tiny'))