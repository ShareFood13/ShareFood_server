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

        res.status(200).json({ password: existingUser.password.split('.')[0].slice(0, 10), message: "👍 Mail sent!!!" })
    } catch (error) {
        res.status(500).json({ message: "👎 Something went wrong!!!" })

    }
}

const contactUs = async (req, res) => {

    console.log("mailController contactUs:", req.body)
    const { fromEmail, fromUserName, subject, title, message, creatorId } = req.body

    console.log(subject, title, message)

    try {

        if (subject === "" || title === "" || message === "") return res.status(400).json({ message: "Required information is missing!!!" })

        const existingUser = await userModel.findOne({ _id: creatorId })

        if (!existingUser) return res.status(404).json({ message: "User does't exist!!!" })

        if (fromEmail !== "" && fromUserName !== "") {
            if (existingUser.email !== fromEmail || existingUser.userName !== fromUserName) return res.status(400).json({ message: "Wrong Data!!!" })
        }

        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: SHARE_FOOD_MAIL,
                pass: GMAIL_PASS
            }
        })

        const details = {
            from: existingUser.email,
            to: SHARE_FOOD_MAIL,
            subject: `${subject}`,
            html: `
        <spam>Mail from <b>${existingUser.name}</b>,</spam>
        <spam>e-mail: <b>${existingUser.email}</b>,</spam>
        <p>${title}</p>
        <p>${message}</p>
        `, // html body

        }

        const details2 = {
            from: SHARE_FOOD_MAIL,
            to: existingUser.email,
            subject: `We got a message from you`,
            html: `
        <spam>Dear <b>${existingUser.name}</b>,</spam>
        <p>We received next mail from you:</p>
        <p>Subject: ${subject}</p>
        <p>Title: ${title}</p>
        <p>Message: ${message}</p>
        <p>We will response to your mail as fast as we can.</p>
        <p>Thank's for contact Us</p>
        <p>Share Food Team</p>
        
        `, // html body

        }

        mailTransporter.sendMail(details, () => mailStatus())
        mailTransporter.sendMail(details2, () => mailStatus())

        const mailStatus = (err) => {
            if (err) {
                console.log('====================================');
                console.log("it has an error", err);
                console.log('====================================');
            } else {
                console.log('====================================');
                console.log("E-mail sent");
                console.log('====================================');
            }
        }

        res.status(200).json(existingUser)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!!!" })

    }
}

module.exports = { sendPassword, contactUs }


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