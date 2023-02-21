const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const auth = async (req, res, next) => {

    try {
        const token = req?.headers?.authorization?.split(" ")[1]

        const isCustomAuth = token?.length < 500

        let decodeData

        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, JWT_SECRET)
            req.userId = decodeData?.userId
        }
        next()

    } catch (error) {
        console.log(error)
    }
}

module.exports = { auth }