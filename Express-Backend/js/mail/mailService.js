var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PW
    }
});

function sendMail(mail){
    transporter.sendMail(mail, function(error, info){
        if (error){
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    })
}

module.exports = {
    sendMail
};