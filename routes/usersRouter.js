const express = require('express')
const router = express.Router()

const userController = require("../DL/controllers/usersController.js")
const mailController = require("../DL/controllers/mailController.js")

const { auth } = require('../middleware/auth.js')


router.post("/signin", userController.signIn)
router.post("/signup", userController.signUp)
router.put("/changepassword", userController.changePassword)
router.get("/getUser/:_id", auth, userController.getUserInfo)

router.post("/sendpassword", mailController.sendPassword)
router.post("/contactus", mailController.contactUs)


router.post("/userprofile/:id", userController.userProfile)
router.put("/userprofileupdate/:id", userController.userProfileUpdate)


module.exports = router