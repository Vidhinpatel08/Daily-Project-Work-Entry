const express = require("express");
const router = express.Router();
// const User = require('../models/User')
const Member = require('../models/Member')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const { findByDisplayValue } = require("@testing-library/react");

const JWT_SECRET = 'welcome$man' // create secret Key
let success = false //if you sucessfully pass Api then Successs true


//  ROUTE - 1 :     create user using : POST "api/auth/createuser". No Login required
router.post('/resetPassword', [
    // check the validations...
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be 5 letters.').isLength({ min: 5 })

], async (req, res) => {

    // if there are error, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // check whether the user with this email exits already
        let user = await Member.findOne({ email: req.body.email }) // check user email already exits or not 
        if (!user) {
            return res.status(400).json({ error: "Sorry a user with this email Not exists" })
        }

        // Create a hash password with salt by bcrypt 
        const salt = await bcrypt.genSalt(10); // return Promise
        const secPass = await bcrypt.hash(req.body.password, salt)

        // create a note object
        const newMember = {};

        //if user want update any perticular field
        { newMember.password = secPass }

        // Find the note to updated to update it 
        // let member = await Member.findById({user: user.id})
        
        // if note not found
        // if (!member) {
        //     return res.status(404).send('Not found')
        // }
        
        // if note Exists 
        let member = await Member.findByIdAndUpdate(user.id, { $set: newMember }, { new: true })
        res.json({ "success": "password has been Updated successfully", member })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
});

// //  ROUTE - 3 :      get logged in user details Using : POST "api/auth/getuser". Login required
// router.post('/getuser', fetchuser, async (req, res) => {

//     try {
//         const userid = req.user.id;
//         const user = await User.findById(userid).select("-password")
//         success = true
//         res.json({ success, user })
//     } catch (error) {
    //         console.error(error.message)
//         res.status(500).send('Internal server Error Occure')
//     }

// });




//  ROUTE - 1 :      Authenticate a user : POST "api/auth/login". No Login required
router.post('/login', [
    // check the validations...
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {

    // if there are error, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // featch email from database
        let user = await Member.findOne({ email })

        // if your don't Exists
        if (!user) {
            return res.status(400).json({ errors: "Please try to login correct credentials" });
        }

        // compare with user's password
        const passwordCompare = await bcrypt.compare(password, user.password)

        // if password ot correct
        if (!passwordCompare) {
            return res.status(400).json({ errors: "Please try to login correct credentials" });
        }

        // successfully login return user id - authentication token
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
})



module.exports = router
