const express = require("express"); // Importing express module
const router = express.Router(); // Creating a router instance
const Member = require('../models/Member'); // Importing the Member model
const fetchuser = require("../middleware/fetchuser"); // Importing fetchuser middleware
const uploadfile = require("../middleware/uploadfile"); // Importing uploadfile middleware
const bcrypt = require('bcryptjs'); // Importing bcryptjs for password hashing

// Route -1 : create Member using : POST "api/member/createmember". No Login required
router.post('/createmember', uploadfile, async (req, res) => {
    try {
        // check whether the user with this email exists already
        let user = await Member.findOne({ email: req.body.email }); // check if user email already exists or not 
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }

        // Create a hashed password with salt by bcrypt 
        const salt = await bcrypt.genSalt(10); // returns a Promise
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a user
        user = await Member.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userRole: req.body.userRole,
            phone: req.body.phone,
            userDesignation: req.body.userDesignation,
            alterPhone: req.body.alterPhone,
            alterEmail: req.body.alterEmail,
            department: req.body.department,
            password: secPass,
            isActive: req.body.isActive,
            joindate: req.body.joindate,
            LeaveStartDate: req.body.LeaveStartDate,
            LeaveEndDate: req.body.LeaveEndDate,
            profile: (req.file ? req.file.filename : null),
        });
        const saveMember = await user.save();
        res.send({ "success": "Member has been added successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error occurred');
    }
});

// ROUTE - 2 : get logged in user details Using : POST "api/auth/getuser". Login required
router.post('/getuser', async (req, res) => {
    try {
        const user = await Member.find({ user: req.userid }).select("-password");
        success = true;
        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error occurred');
    }
});

// ROUTE - 3 : update an existing member : PUT "api/member/updatemember/:id". Login required
router.put('/updatemember/:id', uploadfile, async (req, res) => {
    try {
        const { firstName, lastName, email, userRole, joindate, phone, userDesignation, alterPhone, alterEmail, department, LeaveStartDate, LeaveEndDate, isActive } = req.body;
        // create a member object
        const newMember = {};

        // if user wants to update any particular field
        if (firstName) { newMember.firstName = firstName; }
        if (lastName) { newMember.lastName = lastName; }
        if (email) { newMember.email = email; }
        if (userRole) { newMember.userRole = userRole; }
        if (phone) { newMember.phone = phone; }
        if (userDesignation) { newMember.userDesignation = userDesignation; }
        if (alterPhone) { newMember.alterPhone = alterPhone; }
        if (alterEmail) { newMember.alterEmail = alterEmail; }
        if (department) { newMember.department = department; }
        if (joindate) { newMember.joindate = joindate; }
        if (LeaveStartDate) { newMember.LeaveStartDate = LeaveStartDate; }
        if (LeaveEndDate) { newMember.LeaveEndDate = LeaveEndDate; }
        if (req.file) { newMember.profile = (req.file ? req.file.filename : ''); }
        { newMember.isActive = isActive; }

        // Find the member to be updated
        let ismember = await Member.findById(req.params.id);

        // if member not found
        if (!ismember) {
            return res.status(404).send('Member not found');
        }

        // if member exists 
        let member = await Member.findByIdAndUpdate(req.params.id, { $set: newMember }, { new: true });
        console.log(member);
        res.json({ "success": "Member has been updated successfully", member });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error occurred');
    }
});

// ROUTE - 4 : Delete an existing member : DELETE "api/member/deletemember/:id". Login required
router.delete('/deletemember/:id', async (req, res) => {
    try {
        // Find the member to be deleted
        let member = await Member.findById(req.params.id);

        // if member not found
        if (!member) {
            return res.status(404).send('Member not found');
        }

        // if member exists 
        member = await Member.findByIdAndDelete(req.params.id);
        res.json({ "success": "Member has been deleted successfully", member });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error occurred');
    }
});

module.exports = router; // Exporting the router
