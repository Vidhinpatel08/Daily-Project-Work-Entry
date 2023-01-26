const express = require("express");
const router = express.Router();
const DPRS = require("../models/DPRS");
// const Project = require('../models/Project')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'welcome$man' // create secret Key
let status = false


// //  ROUTE - 1 :     get all the notes : GET "api/project/fetchallnotes". Login required
router.post('/fetchdprs', async (req, res) => {
    try {
        //  wait & find note by user
        const dprs = await DPRS.find().select("")
        status = true
        res.json({ status, dprs })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ status: status, Error: 'Internal server Error Occure' })
    }
})

// Route -2 :  create Project using : POST "api/project/createproject".
router.post('/createdprs', async (req, res) => {
    try {
        // create a new project
        const dprs = await DPRS.create({
            member: req.body.member,
            project: req.body.project,
            date: req.body.date,
            workHour: req.body.workHour,
            managementHour: req.body.managementHour,
            inTime: req.body.inTime,
            outTime: req.body.outTime,
            dprsDescription: req.body.dprsDescription,
        })

        const saveDprs = await dprs.save()
        status = true
        res.send({ status, "success": "Project has been added successfully", saveDprs })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ status: status, Error: 'Internal server Error Occure' })
    }
})


//  ROUTE - 3 :     update an existing project : PUT "api/projrct/updateproject/:id". Login required
router.put('/updatedprs/:id', async (req, res) => {
    try {

        const { member, project, date, workHour, managementHour, inTime, outTime, dprsDescription } = req.body;

        // create a note object
        const newdprs = {};

        //if user want update any perticular field
        if (member) { newdprs.member = member }
        if (project) { newdprs.project = project }
        if (date) { newdprs.date = date }
        if (workHour) { newdprs.workHour = workHour }
        if (managementHour) { newdprs.managementHour = managementHour }
        if (inTime) { newdprs.inTime = inTime }
        if (outTime) { newdprs.outTime = outTime }
        if (dprsDescription) { newdprs.dprsDescription = dprsDescription }

        // Find the note to updated to update it 
        let authentic = await DPRS.findById(req.params.id)

        // if note not found
        if (!authentic) {
            return res.status(404).send({ status, Error: "Project Not found" })
        }


        // if note Exists 
        let dprs = await DPRS.findByIdAndUpdate(req.params.id, { $set: newdprs }, { new: true })
        status = true
        res.send({ status, "success": "Project has been Edited successfully", dprs })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ status: status, Error: 'Internal server Error Occure' })
    }
});


//  ROUTE - 4 :     Delete an existing notes : DELETE "api/project/deleteproject/:id". Login required
router.delete('/deletedprs/:id', async (req, res) => {
    try {

        // Find the note to updated to update it 
        let authentic = await DPRS.findById(req.params.id)

        // if note not found
        if (!authentic) {
            return res.status(404).send({ status, Error: "Project Not found" })
        }

        // if note Exists 
        authentic = await DPRS.findByIdAndDelete(req.params.id)
        status = true
        res.send({ status, "success": "Project has been Deleted successfully", authentic })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ status: status, Error: 'Internal server Error Occure' })
    }
});


//  ROUTE - 5 :     update an Verify : PUT "api/projrct/updateproject/:id". Login required
router.put('/updatedprsverify/:id', async (req, res) => {

    try {
        // create a note object
        const newdprs = { isVarify: req.body.isVarify };

        // Find the note to updated to update it 
        let authentic = await DPRS.findById(req.params.id)

        // if note not found
        if (!authentic) {
            return res.status(404).send({ status, Error: "Project Not found" })
        }

        // if note Exists 
        let dprs = await DPRS.findByIdAndUpdate(req.params.id, { $set: newdprs }, { new: true })
        status = true
        res.send({ status, "success": "Project has been Edited successfully", dprs })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ status: status, Error: 'Internal server Error Occure' })
    }
});

// // for specific Requirement

// // //  ROUTE - 1 :     get all the notes : GET "api/project/fetchallnotes". Login required
// router.post('/fetchdprsummary/:user', async (req, res) => {
//     try {
//         // Get the user parameter
//         const user = req.params.user;

//         // Find DPRS documents where the member field matches the user parameter
//         const dprs = await DPRS.find({ member: user }).select('');

//         // If no DPRS documents are found, return a 404 Not Found response
//         if(!dprs) {
//             res.status(404).json({ status: false, Error: 'No DPRS found for the specified user.' });
//             return;
//         }

//         // Return the found DPRS documents in a JSON response
//         status = true
//         res.send({ status, "success": "Project has been Edited successfully", dprs });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ status: false, Error: 'Internal server Error Occure' });
//     }
// });



module.exports = router