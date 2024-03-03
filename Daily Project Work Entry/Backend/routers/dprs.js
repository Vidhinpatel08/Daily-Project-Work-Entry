// This script contains routes for handling Daily Project Work Entry related operations.

// Importing required modules
const express = require("express");
const router = express.Router();
const DPRS = require("../models/DPRS");
const jwt = require('jsonwebtoken');

// Secret key for JWT authentication
const JWT_SECRET =  process.env.JWT_SECRET;
let status = false;

// Route to fetch all DPRS entries
router.post('/fetchdprs', async (req, res) => {
    try {
        const dprs = await DPRS.find().select("");
        status = true;
        res.json({ status, dprs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' });
    }
});

// Route to create a new DPRS entry
router.post('/createdprs', async (req, res) => {
    try {
        const dprs = await DPRS.create({
            member: req.body.member,
            project: req.body.project,
            date: req.body.date,
            workHour: req.body.workHour,
            managementHour: req.body.managementHour,
            inTime: req.body.inTime,
            outTime: req.body.outTime,
            dprsDescription: req.body.dprsDescription,
        });
        const saveDprs = await dprs.save();
        status = true;
        res.send({ status, "success": "Project has been added successfully", saveDprs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' });
    }
});

// Route to update an existing DPRS entry
router.put('/updatedprs/:id', async (req, res) => {
    try {
        const { member, project, date, workHour, managementHour, inTime, outTime, dprsDescription } = req.body;
        const newdprs = {};
        if (member) { newdprs.member = member }
        if (project) { newdprs.project = project }
        if (date) { newdprs.date = date }
        if (workHour) { newdprs.workHour = workHour }
        if (managementHour) { newdprs.managementHour = managementHour }
        if (inTime) { newdprs.inTime = inTime }
        if (outTime) { newdprs.outTime = outTime }
        if (dprsDescription) { newdprs.dprsDescription = dprsDescription }
        let authentic = await DPRS.findById(req.params.id)
        if (!authentic) {
            return res.status(404).send({ status, Error: "Project Not found" })
        }
        let dprs = await DPRS.findByIdAndUpdate(req.params.id, { $set: newdprs }, { new: true })
        status = true
        res.send({ status, "success": "Project has been Edited successfully", dprs })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' })
    }
});

// Route to delete an existing DPRS entry
router.delete('/deletedprs/:id', async (req, res) => {
    try {
        let authentic = await DPRS.findById(req.params.id)
        if (!authentic) {
            return res.status(404).send({ status, Error: "Project Not found" })
        }
        authentic = await DPRS.findByIdAndDelete(req.params.id)
        status = true
        res.send({ status, "success": "Project has been Deleted successfully", authentic })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' })
    }
});

// Route to update the verification status of a DPRS entry
router.put('/updatedprsverify/:id', async (req, res) => {
    try {
        const newdprs = { isVarify: req.body.isVarify };
        let authentic = await DPRS.findById(req.params.id)
        if (!authentic) {
            return res.status(404).send({ status, Error: "Project Not found" })
        }
        let dprs = await DPRS.findByIdAndUpdate(req.params.id, { $set: newdprs }, { new: true })
        status = true
        res.send({ status, "success": "Project has been Edited successfully", dprs })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' })
    }
});

module.exports = router;
