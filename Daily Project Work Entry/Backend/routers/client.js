// Importing required modules
const express = require("express");
const Client = require("../models/Client");
const router = express.Router();
const Member = require('../models/Member')

// Flag to track API success
let success = false;

//  ROUTE - 1 :      get logged in user details Using : POST "api/client/getclient". Login required
router.post('/fetchClient', async (req, res) => {
    try {
        // Fetch user details based on logged in user ID
        const user = await Client.find({ user: req.userid }).select("");
        // Set success flag to true upon successful API execution
        success = true;
        res.json({ user });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).send('Internal server Error Occurred');
    }
});

//  ROUTE - 2 :      Authenticate a user : POST "api/client/createclient". No Login required
router.post('/createclient', async (req, res) => {
    const { clientName, country, code, staus } = req.body;
    try {
        // Check if client already exists
        let user = await Client.findOne({ clientName });
        // If client exists, return error
        if (user) {
            return res.status(400).json({ errors: "Please try to login correct credentials" });
        }
        // Create new client
        user = await Client.create({
            clientName: clientName,
            country: country,
            code: code,
            ActiveStatus: staus,
        });
        // Save client to database
        const saveclient = await user.save();
        res.send({ "success": "Client has been added successfully" });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).send('Internal server Error Occurred');
    }
});

//  ROUTE - 3 :     update an existing notes : PUT "api/notes/updatenote/:id". Login required
router.put('/updateclient/:id',  async (req, res) => {
    try {
        const { clientName, country, code, staus } = req.body;
        // Create client object
        const newClient = {};
        // Update client fields if provided
        if (clientName) { newClient.clientName = clientName }
        if (country) { newClient.country = country }
        if (code) { newClient.code = code }
        newClient.ActiveStatus = staus;
        // Find client by ID
        let ismember = await Client.findById(req.params.id);
        // If client not found
        if (!ismember) {
            return res.status(404).send('Not found');
        }
        // Update client details
        let client = await Client.findByIdAndUpdate(req.params.id, { $set: newClient }, { new: true });
        console.log(client);
        res.json({ "success": "client has been Updated successfully", client });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).send('Internal server Error Occurred');
    }
});

//  ROUTE - 4 :     Delete an existing notes : DELETE "api/notes/deletenote/:id". Login required
router.delete('/deleteclient/:id', async (req, res) => {
    try {
        // Find client by ID
        let client = await Client.findById(req.params.id);
        // If client not found
        if (!client) {
            return res.status(404).send('Not found');
        }
        // Delete client
        client = await Client.findByIdAndDelete(req.params.id);
        res.json({ "success": "Member has been Deleted successfully", client });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).send('Internal server Error Occurred');
    }
});

// Export the router
module.exports = router;
