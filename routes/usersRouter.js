const express = require('express')
const router = express.Router()

const userController = require("../DL/controllers/usersController.js")
const mailController = require("../DL/controllers/mailController.js")

router.post("/signin", userController.signIn)
router.post("/signup", userController.signUp)
router.put("/changepassword", userController.changePassword)

router.post("/sendpassword", mailController.sendPassword)


router.post("/userprofile/:id", userController.userProfile)
router.put("/userprofileupdate/:id", userController.userProfileUpdate)

// router.post("/sendmail", userController.sendMail)

module.exports = router