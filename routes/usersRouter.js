const express = require('express')
const router = express.Router()

const userController = require("../DL/controllers/usersController.js")
const mailController = require("../DL/controllers/mailController.js")

const { auth } = require('../middleware/auth.js')


router.post("/signin", userController.signIn)
router.post("/signup", userController.signUp)
router.put("/changepassword", userController.changePassword)
router.get("/getUser/:_id", auth, userController.getUserInfo)

router.get("/getotherusers/:_id", auth, userController.getOtherUsers)
router.put("/startfollowing", auth, userController.startFollowing)
router.put("/stopfollowing", auth, userController.stopFollowing)

router.post("/sendpassword", mailController.sendPassword)
router.post("/contactus", mailController.contactUs)


router.put("/userprofile/:_id", userController.userProfile)
router.put("/userprofileupdate/:_id", userController.userProfileUpdate)

router.put("/usersettings/:_id", userController.userSettings)
// router.put("/usersettingsupdate/:_id", userController.userSettingsUpdate)


module.exports = router