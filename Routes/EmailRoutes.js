const Router = require('express').Router();
const Email = require('../models/Email');

//get all emails
Router.get('/', async function (req, res) {
    try {
        let allEmails = await Email.find({});
        return res.json(allEmails);
    }
    catch(err) {
        console.log('Error parsing email:', err);
        return res.status(500).send('Internal Server Error');
    }
});


//create an email alias
Router.post('/', async function (req, res) {
    try{
        console.log(req.body);
        let newMail = await Email.create(req.body);
        return res.json(newMail);
    }catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});


//delete an email
Router.delete('/:id', async function (req, res) {
    try {
        const {id} = req.params;
        if(id) {
            await Email.findByIdAndDelete(id);
            return res.json({success: true});
        }

        return res.status(404).send('Not Found');
    }catch (e) {
        console.log('Error parsing email:', e);
        return res.status(500).send(e?.message);
    }
});

//update the email
Router.put('/:id', async function (req, res) {
    try {
        const {id} = req.params;
        if(id) {
            let updatedEmail = await Email.findByIdAndUpdate(id, req.body, {new: true});
            return res.json(updatedEmail);
        }
    }catch (e) {
        console.log('Error Updating email:', e);
        res.status(500).send(e?.message);
    }
})


module.exports = Router;