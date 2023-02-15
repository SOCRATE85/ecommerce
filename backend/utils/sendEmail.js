const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",//process.env.SMTP_HOST,
        port: 465,//process.env.SMTP_PORT,  
        service: process.env.SMTP_SERVICES,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD        
        },
        logger: false,        
    });
//6:24:52
    const mailOptions  ={
        from: `The G.O.A <${process.env.USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;