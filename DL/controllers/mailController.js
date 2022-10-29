const nodemailer = require("nodemailer");

const userModel = require("../../DL/models/userModel")

const GMAIL_PASS = process.env.MAIL_PASS
const SHARE_FOOD_MAIL = process.env.SHARE_FOOD_MAIL

const sendPassword = async (req, res) => {
    const { email, userName } = req.body

    try {

        if (!email || !userName) return res.status(400).json({ message: "Required information is missing!!!" })

        const existingUser = await userModel.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User does't exist!!!" })

        const existingUserName = await userModel.findOne({ userName })

        if (!existingUserName) return res.status(400).json({ message: "UserName incorrect or doesn't exist." })

        if (userName !== existingUser.userName) return res.status(400).json({ message: "Wrong Data." })

        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: SHARE_FOOD_MAIL,
                pass: GMAIL_PASS
            }
        })

        const details = {
            from: SHARE_FOOD_MAIL,
            to: existingUser.email,
            subject: "Password Change",
            html: `
        <spam>Good morning <b>${existingUser.name}</b>,</spam>
        <p>Did you ask to change your password?</p>
        <p>If yes, please copy the code below to your app and change your password.</p>
        <p>Code: ${existingUser.password.split('.')[0].slice(0, 10)}</p>
        <p>If not, please delete this e-mail.</p>
        <p>Thank you, ShareFood team.</p>
        `, // html body

        }

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log('====================================');
                console.log("it has an error", err);
                console.log('====================================');
            } else {
                console.log('====================================');
                console.log("E-mail sent");
                console.log('====================================');
            }
        })

        res.status(200).json(existingUser)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!!!" })

    }
}

module.exports = { sendPassword }


// const MailSlurp = require('mailslurp-client').default

// const MAILSLURT_API = process.env.MAILSLURT_API

// const mailslurp = new MailSlurp({ apiKey: MAILSLURT_API })

// const sendPassword = async (req, res) => {
//     console.log('====================================');
//     console.log("sendPassword", req.body);
//     console.log('====================================');
//     const { email, userName } = req.body

//     // const inbox = await mailslurp.createInbox()

//     // console.log('====================================');
//     // console.log("inbox", inbox);
//     // console.log('====================================');


//     try {
//         // const sentEmail = await mailslurp.sendEmail(
//         //     "190c85ef-1b14-48f1-84bf-fe8774d2931b",
//         //     {
//         //         to: [email],
//         //         subject: `Hello ${userName}`,
//         //         body: `<h1>${userName}</h1>`,
//         //         html: true,
//         //     }
//         // )
//         const options = {
//             to: [email],
//             subject: 'Hello',
//             body: 'Welcome',
//         };

//         const sent = await mailslurp.commonController.sendEmailSimple("190c85ef-1b14-48f1-84bf-fe8774d2931b", options);
//         console.log('====================================');
//         console.log(sent);
//         console.log('====================================');
//         expect(sent.subject).toContain('Hello');


//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong!!!" })


//     }
// }

// module.exports = { sendPassword }