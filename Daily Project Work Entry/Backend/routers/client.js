const express = require("express");
const Client = require("../models/Client");
const router = express.Router();
const Member = require('../models/Member')
let success = false //if you sucessfully pass Api then Successs true





//  ROUTE - 2 :      Authenticate a user : POST "api/client/createclient". No Login required
router.post('/createclient', async (req, res) => {

    const { clientName, country } = req.body;
    
    try {
        // featch email from database
        let user = await Client.findOne({ clientName })
        
        // if your don't Exists
        if (user) {
            return res.status(400).json({ errors: "Please try to login correct credentials" });
        }
        
        user = await Client.create({
            clientName: clientName,
            country: country
        })
        const saveclient = await user.save()
        res.send({"success": "Client has been added successfully"})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
})

//  ROUTE - 1 :      get logged in user details Using : POST "api/client/getclient". Login required
router.post('/fetchClient', async (req, res) => {

    try {
        // const userid = req.Member.id;
        const user = await Client.find({ user: req.userid }).select("")
        success = true
        res.json({ user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }

});


module.exports = router
