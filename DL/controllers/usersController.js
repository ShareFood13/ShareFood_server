const bcrypt = require('bcrypt')
const saltRounds = 12

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const userModel = require("../../DL/models/userModel")

const getUserInfo = async (req, res) => {
    const { _id } = req.params

    try {
        const userInfo = await userModel.findOne({ _id: _id }).populate('eventsId').populate('mealsId').populate('recipesId')

        res.status(200).json({ result: userInfo })

    } catch (error) {
        res.status(500).json({ message: "getUserInfo: Something went wrong!!!" })

    }
}

const signIn = async (req, res) => {
    const { email, password, userName } = req.body

    try {
        const existingUser = await userModel.findOne({ email })//.populate('eventsId').populate('mealsId') //.populate('recipesId')

        if (!existingUser) return res.status(404).json({ message: "User does't exist!!!" })

        const existingUserName = await userModel.findOne({ userName })

        if (!existingUserName) return res.status(400).json({ message: "UserName incorrect or doesn't exist." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Password!!!" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, {})

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "👎 Something went wrong!!!" })
    }

}

const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, isPermission, userName } = req.body

    try {
        if (!email || !password || !confirmPassword || !firstName || !lastName || !isPermission || !userName) return res.status(400).json({ message: "Required information is missing!!!" })

        const existingUser = await userModel.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "User already exists!!!" })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match!!!" })

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const result = await userModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, isPermission, userName })

        const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, {})

        res.status(200).json({ result, token })
    } catch (error) {

        res.status(500).json({ message: "👎 Something went wrong!!!" })
    }
}

// const sendPassword = async (req, res) => {
//     const { email, userName } = req.body

//     try {
//         if (!email || !userName) return res.status(400).json({ message: "Required information is missing!!!" })

//         const existingUser = await userModel.findOne({ email })

//         if (!existingUser) return res.status(404).json({ message: "User does't exist!!!" })

//         const existingUserName = await userModel.findOne({ userName })

//         if (!existingUserName) return res.status(400).json({ message: "UserName incorrect or doesn't exist." })

//         if (userName !== existingUser.userName) return res.status(400).json({ message: "Wrong Data." })

//         res.status(200).json(existingUser)
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong!!!" })

//     }
// }

const changePassword = async (req, res) => {
    const { code, email, password, confirmPassword } = req.body

    try {

        if (!code || !email || !password || !confirmPassword) return res.status(400).json({ message: "Required information is missing!!!" })

        const existingUser = await userModel.findOne({ email })

        if (!existingUser) return res.status(400).json({ message: "User doesn't exist!!!" })

        if (code !== existingUser.password.split('.')[0].slice(0, 10)) return res.status(400).json({ message: "Code is incorrect!!! Check your e-mail" })

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const result = await userModel.findByIdAndUpdate(existingUser._id, { password: hashedPassword })

        const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, {})

        res.status(200).json({ result, token, message2: "👍 Password changed!!!" })
    } catch (error) {

        res.status(500).json({ message: "👎 Something went wrong!!!" })
    }
}

const userProfile = async (req, res) => {
    const { _id } = req.params
    // console.log('====================================');
    // console.log("userProfile _id", _id);
    console.log("userprofile req.body", req.body);
    // console.log('====================================');

    try {
        const user = await userModel.findOne({ _id })

        // console.log("user", user)

        const updateUser = { user, name: req.body.name, profile: req.body.profile }
        // console.log("updateUser", updateUser)

        const result = await userModel.findByIdAndUpdate(_id, updateUser, { new: true })

        res.status(200).json({ result, message: "👍 Profile saved!!!!" })
    } catch (error) {

        res.status(500).json({ message: error })
        // res.status(500).json({ message: "👎 Something went wrong!!!" })
    }
}

const userProfileUpdate = async (req, res) => {
    const { _id } = req.params
    console.log('====================================');
    console.log("userprofile", req.body, id);
    console.log('====================================');
}

const getOtherUsers = async (req, res) => {

    const { _id } = req.params

    try {

        const otherUsers = await userModel.find({ _id: { $ne: _id } })

        // console.log("usersController getOtherUsers", otherUsers)

        res.status(200).json({ otherUsers })
    } catch (error) {

        res.status(500).json({ message: "👎 Something went wrong!!!" })
    }
}

const startFollowing = async (req, res) => {
    const { userId, follow_id } = req.body
    var otherUser = ""
    var user = ""

    try {

        const result = await userModel.findById({ _id: userId })

        if (!result.profile.following.includes(follow_id)) {
            user = await userModel.findByIdAndUpdate(userId, { $push: { 'profile.following': { $each: [follow_id] } } })
        }


        const result2 = await userModel.findById({ _id: follow_id })

        if (!result2.profile.followers.includes(userId)) {
            otherUser = await userModel.findByIdAndUpdate(follow_id, { $push: { 'profile.followers': { $each: [userId] } } })
        }

        res.status(200).json({ result: user, message: `👍 You start follow ${otherUser.userName}!!!!` })
    } catch (error) {

        res.status(500).json({ message: "👎 Something went wrong!!!" })
    }
}

const stopFollowing = async (req, res) => {

    const { my_id, follow_id } = req.params
    console.log({ my_id, follow_id })


    // try {

    //     const otherUsers = await userModel.find({ _id: { $ne: _id } })

    //     // console.log("usersController getOtherUsers", otherUsers)

    //     res.status(200).json({ otherUsers })
    // } catch (error) {

    //     res.status(500).json({ message: "👎 Something went wrong!!!" })
    // }
}



module.exports = { signIn, signUp, changePassword, userProfile, userProfileUpdate, getUserInfo, getOtherUsers, startFollowing, stopFollowing }