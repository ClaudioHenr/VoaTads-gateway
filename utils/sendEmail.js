const nodemail = require('nodemailer')
require('dotenv-safe').config()

const transporter = nodemail.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SECRET
    }
})

function sendEmail(to) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: 'claudio.oliveira10.0p@gmail.com',
            subject: 'Acesso ao VoaTads',
            text: `Olá, sua senha de acesso ao VoaTads é: ` 
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);

            } 
        })
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        throw error;
    }
}

module.exports = { sendEmail }


