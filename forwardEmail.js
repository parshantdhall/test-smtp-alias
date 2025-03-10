const nodemailer = require('nodemailer');
const Email = require('./models/Email');
const {pass, user} = require("./config");

const transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
});

module.exports = async function forwardIfAlias(email) {
   try{
       let { from, to, subject, text, html, attachments } = email;
       from = from.text.trim();
       to = to.text.trim();

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
               html: html,
               attachments: attachments,
           }, (error, info) => {
               if (error) {
                   console.error('Error forwarding email:', error);
               } else {
                   console.log('Email forwarded:', info.response);
               }
           });
       }else {
           console.log("There is no matching email or Email is de-active");
       }
   }
   catch(err) {
       console.error('Error forwarding email:', err);
   }
}
