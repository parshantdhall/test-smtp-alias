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
        user: 'parshantdhall',
        pass: 'Dhall@010'
    }
});

module.exports = function forwardIfAlias(from, to, subject, text) {
    const realEmail = aliasMap.get(to);
    if (realEmail) {
        transporter.sendMail({
            from: from,
            to: realEmail,
            subject: subject,
            text: text
        }, (error, info) => {
            if (error) {
                console.error('Error forwarding email:', error);
            } else {
                console.log('Email forwarded:', info.response);
            }
        });
    }
}
