// const nodemailer = require('nodemailer');

// class MailService {

//     constructor() {
//         this.transporter = nodemailer.createTransport({
//             // service: 'gmail',
//             host: process.env.SMTP_HOST,
//             port: process.env.SMTP_PORT,
//             secure: false,
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_GEN
//             }
//         })
//     }


//     async SendMail(to, link) {
//         await this.transporter.sendMail({
//             from: process.env.SMTP_USER,
//             to,
//             subject: 'Verify your email' + process.env.API_URL,
//             text: '',
//             html:
//                 `
//                 <div>
//                     <h1>Verify your email</h1>
//                     <a href="${link}">Click here to verify your email ${link}</a>
//                 </div>
//             `
//         })
//     }

// }

// module.exports = new MailService();