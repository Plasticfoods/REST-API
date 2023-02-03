const express = require("express");
const router = express.Router();
const Users = require('../models/users.js');

router.get('/', async(req, res) => {
    try {
        const users = await Users.find();
        console.log(users);
        res.send(users);
    }
    catch(err) {
        res.status(500).json({ errorCode: 500 });
    }
});


router.post('/', async(req, res) => {
    try {
        if(!req.body.name || !req.body.email) {
            return res.status(400).json({error: "name and email required"});
        }
        
        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            orderHistory: req.body.orderHistory
        });
        
        await newUser.save();
        // console.log(newUser);
        res.status(200).json({message: `new user created`});
    }
    catch(err) {
        console.log(err);
    }
});


router.patch('/', async (req, res) => {
    if(!req.body.name || !req.body.key || !req.body.value) {
        res.status(400).json( {message: 'Wrong Input'} );
    }

    try {
        const key = req.body.key;
        const value = req.body.value;

        const filter = { name: req.body.name };
        const update = { [key]: value };
        console.log(update);

        const doc = await Users.findOneAndUpdate(filter, update, {new: true});
        console.log(doc);
        res.status(200).json({message: 'updated'});
    }
    catch (err) {
        console.log(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const doc = await Users.deleteOne({_id: req.params.id});
        console.log(doc);

        res.status(200).json({message: 'User deleted'});
    }
    catch(err) {
        console.log(err.message);
    }
});


module.exports = router;