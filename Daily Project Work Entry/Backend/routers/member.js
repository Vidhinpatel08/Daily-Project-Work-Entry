const express = require("express");
const router = express.Router();
const Member = require('../models/Member')
const fetchuser = require("../middleware/fetchuser");
const uploadfile = require("../middleware/uploadfile");

const bcrypt = require('bcryptjs');

// Route -1 :  create Member using : POST "api/member/createmember". No Login required
router.post('/createmember', uploadfile, async (req, res) => {
    try {
        // check whether the user with this email exits already
        let user = await Member.findOne({ email: req.body.email }) // check user email already exits or not 
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        // Create a hash password with salt by bcrypt 
        const salt = await bcrypt.genSalt(10); // return Promise
        const secPass = await bcrypt.hash(req.body.password, salt)

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
        })
        const saveMember = await user.save()
        res.send({ "success": "Member has been added successfully" })


    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
})

//  ROUTE - 2 :      get logged in user details Using : POST "api/auth/getuser". Login required
router.post('/getuser', async (req, res) => {

    try {
        // const userid = req.Member.id;
        const user = await Member.find({ user: req.userid }).select("-password")
        success = true
        res.json({ user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }

});



//  ROUTE - 3 :     update an existing notes : PUT "api/notes/updatenote/:id". Login required
router.put('/updatemember/:id', uploadfile, async (req, res) => {
    try {

        const { firstName, lastName, email, userRole, joindate, phone, userDesignation, alterPhone, alterEmail, department, LeaveStartDate, LeaveEndDate,isActive } = req.body;
        console.log(req.file)
        // create a note object
        const newMember = {};

        //if user want update any perticular field
        if (firstName) { newMember.firstName = firstName }
        if (lastName) { newMember.lastName = lastName }
        if (email) { newMember.email = email }
        if (userRole) { newMember.userRole = userRole }
        if (phone) { newMember.phone = phone }
        if (userDesignation) { newMember.userDesignation = userDesignation }
        if (alterPhone) { newMember.alterPhone = alterPhone }
        if (alterEmail) { newMember.alterEmail = alterEmail }
        if (department) { newMember.department = department }
        if (joindate) { newMember.joindate = joindate }
        if (LeaveStartDate) { newMember.LeaveStartDate = LeaveStartDate }
        if (LeaveEndDate) { newMember.LeaveEndDate = LeaveEndDate }
        if (req.file) { newMember.profile = (req.file ? req.file.filename : '') }
        { newMember.isActive = isActive }

        // Find the note to updated to update it 
        let ismember = await Member.findById(req.params.id)

        // if note not found
        if (!ismember) {
            return res.status(404).send('Not found')
        }

        // if note Exists 
        let member = await Member.findByIdAndUpdate(req.params.id, { $set: newMember }, { new: true })
        res.json({ "success": "Member has been Updated successfully", member })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
});


//  ROUTE - 4 :     Delete an existing notes : DELETE "api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', async (req, res) => {
    try {

        // Find the note to updated to update it 
        let member = await Member.findById(req.params.id)

        // if note not found
        if (!member) {
            return res.status(404).send('Not found')
        }

        // if note Exists 
        member = await Member.findByIdAndDelete(req.params.id)
        res.json({ "success": "Member has been Deleted successfully", member })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
});


module.exports = router