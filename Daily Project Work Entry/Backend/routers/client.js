const express = require("express");
const Client = require("../models/Client");
const router = express.Router();
const Member = require('../models/Member')
let success = false //if you sucessfully pass Api then Successs true


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


//  ROUTE - 2 :      Authenticate a user : POST "api/client/createclient". No Login required
router.post('/createclient', async (req, res) => {

    const { clientName, country, code,staus } = req.body;
    try {
        // featch email from database
        let user = await Client.findOne({ clientName })
        
        // if your don't Exists
        if (user) {
            return res.status(400).json({ errors: "Please try to login correct credentials" });
        }
        
        user = await Client.create({
            clientName: clientName,
            country: country,
            code: code,
            ActiveStatus: staus,
        })
        const saveclient = await user.save()
        res.send({"success": "Client has been added successfully"})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
})



//  ROUTE - 3 :     update an existing notes : PUT "api/notes/updatenote/:id". Login required
router.put('/updateclient/:id',  async (req, res) => {
    try {

        const { clientName, country, code,staus } = req.body;
        // create a note object
        const newClient = {};

        //if user want update any perticular field
        if (clientName) { newClient.clientName = clientName }
        if (country) { newClient.country = country }
        if (code) { newClient.code = code }
        { newClient.ActiveStatus = staus }

        // Find the note to updated to update it 
        let ismember = await Client.findById(req.params.id)

        // if note not found
        if (!ismember) {
            return res.status(404).send('Not found')
        }

        // if note Exists 
        let client = await Client.findByIdAndUpdate(req.params.id, { $set: newClient }, { new: true })
        console.log(client)
        res.json({ "success": "client has been Updated successfully", client })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
});


//  ROUTE - 4 :     Delete an existing notes : DELETE "api/notes/deletenote/:id". Login required
router.delete('/deleteclient/:id', async (req, res) => {
    try {

        // Find the note to updated to update it 
        let client = await Client.findById(req.params.id)

        // if note not found
        if (!client) {
            return res.status(404).send('Not found')
        }

        // if note Exists 
        client = await Client.findByIdAndDelete(req.params.id)
        res.json({ "success": "Member has been Deleted successfully", client })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
});

module.exports = router
