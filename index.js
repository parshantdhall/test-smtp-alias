const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;
const forwardIfAlias = require('./forwardEmail');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const EmailRoutes = require('./Routes/EmailRoutes');

//express server config
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
//mongoDB configs
const uri = "mongodb+srv://parshantdhall:JalplZt8tWmGln9K@emailforwarder.zsmmk.mongodb.net/EmailDB?retryWrites=true&w=majority&appName=EmailForwarder";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri)
    .then(() => console.log('Mongo DB Connected!'));

//MAil server config
const server = new SMTPServer({
    onData(stream, session, callback) {
        simpleParser(stream).then(email => {
            console.log(email)
            // Process the incoming email
            const { from, to, subject, text } = email;

            // Check if the recipient is an alias and forward if necessary
            forwardIfAlias(from.text.trim(), to.text.trinm(), subject, text);

            callback();
        }).catch(err => {
            console.error('Error parsing email:', err);
            callback(err);
        });
    },
    authOptional: true
});

//Routes
app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.use('/email', EmailRoutes);

//---Listening for Mail sever----
server.listen(80, () => {
    console.log('SMTP server listening on port 80');
});

//--Listening for Express  server---
app.listen(PORT, () => {
    console.log('SMTP server listening on port ' + PORT);
});
