const Router = require('express').Router();
const Email = require('../models/Email');

//get all emails
Router.get('/', async function (req, res) {
    try {
        let allEmails = await Email.find({});
        res.json(allEmails);
    }
    catch(err) {
        console.log('Error parsing email:', err);
        res.status(500).send('Internal Server Error');
    }
});


//create an email alias
Router.post('/', async function (req, res) {
    try{
        console.log(req.body);
        let newMail = await Email.create(req.body);
        res.json(newMail);
    }catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }
});


module.exports = Router;