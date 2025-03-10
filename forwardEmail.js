const nodemailer = require('nodemailer');
const Email = require('./models/Email');

const transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

module.exports = async function forwardIfAlias(from, to, subject, text) {
   try{
       console.log("----------------Reached Forwarding--------")
       const realEmail = await Email.findOne({alias: to})
       if (realEmail && realEmail.isActive) {
           console.log(`----------------Forwarding Email to ${realEmail.realEmail}--------`);
           transporter.sendMail({
               from: {
                   name: from,
                   address: to,
               },
               to: realEmail.realEmail,
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
   catch(err) {
       console.error('Error forwarding email:', err);
   }
}
