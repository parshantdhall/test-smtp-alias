const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;
const forwardIfAlias = require('./forwardEmail');

const server = new SMTPServer({
    onData(stream, session, callback) {
        simpleParser(stream).then(email => {
            // Process the incoming email
            const { from, to, subject, text } = email;

            // Check if the recipient is an alias and forward if necessary
            forwardIfAlias(from, to, subject, text);

            callback();
        }).catch(err => {
            console.error('Error parsing email:', err);
            callback(err);
        });
    },
    authOptional: true
});

server.listen(25, () => {
    console.log('SMTP server listening on port 25');
});
