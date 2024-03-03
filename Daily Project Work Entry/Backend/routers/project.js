const express = require("express");
const router = express.Router();
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const JWT_SECRET =  process.env.JWT_SECRET;
let status = false;


// ROUTE - 1: Fetch all projects: GET "api/project/fetchproject". Login required
router.get('/fetchproject', async (req, res) => {
    try {
        // Fetch all projects
        const project = await Project.find().select("");
        status = true;
        res.json({ status, project });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' });
    }
});

// Route - 2: Create a new project: POST "api/project/createproject".
router.post('/createproject', async (req, res) => {
    try {
        // Create a new project
        const project = await Project.create({
            projectName: req.body.projectName,
            clientName: req.body.clientName,
            member: req.body.member,
            durationHours: req.body.durationHours,
            durationType: req.body.durationType,
            limithours: req.body.limithours,
            technologies: req.body.technologies,
            projectManager: req.body.projectManager,
            type: req.body.type,
            projectDescription: req.body.projectDescription,
        });

        const saveproject = await project.save();
        status = true;
        res.send({ status, "success": "Project has been added successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' });
    }
});


// ROUTE - 3: Update an existing project: PUT "api/project/updateproject/:id". Login required
router.put('/updateproject/:id', async (req, res) => {
    try {

        const { projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription } = req.body;

        // Create a project object
        const newproject = {};

        // If user wants to update any particular field
        if (projectName) { newproject.projectName = projectName; }
        if (clientName) { newproject.clientName = clientName; }
        if (member) { newproject.member = member; }
        if (durationHours) { newproject.durationHours = durationHours; }
        if (durationType) { newproject.durationType = durationType; }
        if (limithours) { newproject.limithours = limithours; }
        if (technologies) { newproject.technologies = technologies; }
        if (projectManager) { newproject.projectManager = projectManager; }
        if (type) { newproject.type = type; }
        if (projectDescription) { newproject.projectDescription = projectDescription; }

        // Find the project to be updated
        let project = await Project.findById(req.params.id);

        // If project not found
        if (!project) {
            return res.status(404).send({ status, Error: "Project Not found" });
        }

        // If project exists 
        project = await Project.findByIdAndUpdate(req.params.id, { $set: newproject }, { new: true });
        status = true;
        res.send({ status, "success": "Project has been Edited successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' });
    }
});


// ROUTE - 4: Delete an existing project: DELETE "api/project/deleteproject/:id". Login required
router.delete('/deleteproject/:id', async (req, res) => {
    try {

        // Find the project to be deleted
        let project = await Project.findById(req.params.id);

        // If project not found
        if (!project) {
            return res.status(404).send({ status, Error: "Project Not found" });
        }

        // If project exists 
        project = await Project.findByIdAndDelete(req.params.id);
        status = true;
        res.send({ status, "success": "Project has been Deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: status, Error: 'Internal server Error Occurred' });
    }
});


module.exports = router;
