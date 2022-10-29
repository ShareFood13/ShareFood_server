const bcrypt = require('bcrypt')
const saltRounds = 12

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const userModel = require("../../DL/models/userModel")

const signIn = async (req, res) => {
    const { email, password, userName } = req.body

    try {
        const existingUser = await userModel.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User does't exist!!!" })

        const existingUserName = await userModel.findOne({ userName })

        if (!existingUserName) return res.status(400).json({ message: "UserName incorrect or doesn't exist." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Password!!!" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, {})

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!!!" })
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
        res.status(500).json({ message: "Something went wrong!!!" })

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

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!!!" })

    }
}

const userProfile = async (req, res) => {
    const { id } = req.params
    console.log('====================================');
    console.log("userprofile", req.body);
    console.log('====================================');
}

const userProfileUpdate = async (req, res) => {
    const { id } = req.params
    console.log('====================================');
    console.log("userprofile", req.body, id);
    console.log('====================================');
}


module.exports = { signIn, signUp, changePassword, userProfile, userProfileUpdate }