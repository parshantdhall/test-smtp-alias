const nodemailer = require('nodemailer');

const aliasMap = new Map([
    ['alias1@parshantdhall.com', 'parshant.dhall@gmail.com'],
    ['alias2@parshantdhall.com', 'parshant.dhall@gmail.com']
]);

const transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

module.exports = function forwardIfAlias(from, to, subject, text) {
    console.log("----------------Reached Forwarding--------")
    const realEmail = aliasMap.get(to);
    if (realEmail) {
        console.log("----------------if real email--------")
        transporter.sendMail({
            from: {
                name: from,
                address: to,
            },
            to: realEmail,
            subject: subject,
            text: text,
            sender: from,
        }, (error, info) => {
            if (error) {
                console.error('Error forwarding email:', error);
            } else {
                console.log('Email forwarded:', info.response);
            }
        });
    }
}
