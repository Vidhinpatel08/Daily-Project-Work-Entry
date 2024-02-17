const express = require("express");
const router = express.Router();
// const User = require('../models/User') // This line is commented out, possibly unused
const Member = require('../models/Member'); // Importing Member model
const { body, validationResult } = require('express-validator'); // Importing express-validator for validation
const bcrypt = require('bcryptjs'); // Importing bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for authentication
const fetchuser = require("../middleware/fetchuser"); // Importing custom middleware
var nodemailer = require('nodemailer'); // Importing nodemailer for sending emails

let MyPassword = 'OSYfPbQ8YahZ7heZ4BNj83jYyT0rR650'; // Testing email password by third party app
let MyEmailId = '84ghhzww@mailosaur.net'; // Testing email password by third party app
// let MyPassword = 'xxxxxxxx'; // Your email password
// let MyEmailId = 'xxxxx@gmail.com'; // Your email address



const JWT_SECRET = 'welcome$man'; // Secret key for JWT authentication
let success = false; // Flag for API success

// Route to get user details after authentication
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await Member.findById(userid).select("-password");
        success = true; // Set success flag to true
        res.json({ success, user }); // Send success flag and user details in response
    } catch (error) {
        console.error(error.message); // Log error message
        res.status(500).send('Internal server Error Occurred'); // Send internal server error response
    }
});

// Route to reset password : Login required
router.put('/resetPassword/:id', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
        const secPass = await bcrypt.hash(req.body.password, salt); // Hash password
        const newdprs = { password: secPass }; // New password object

        let authentic = await Member.findById(req.params.id); // Find user by id

        if (!authentic) {
            return res.status(404).send({ Error: "Project Not found" }); // Send error response if user not found
        }

        let member = await Member.findByIdAndUpdate(req.params.id, { $set: newdprs }, { new: true }); // Update user password
        success = true; // Set success flag to true
        res.send({ "success": "Project has been Edited successfully", success }); // Send success message in response
    } catch (error) {
        console.error(error.message); // Log error message
        res.status(500).json({ success, Error: 'Internal server Error Occurred' }); // Send internal server error response
    }
});

// Route for user's Authenticate : No login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Send validation errors if any
    }

    const { email, password } = req.body;

    try {
        let user = await Member.findOne({ email }); // Find user by email

        if (!user) {
            return res.status(400).json({ errors: "Please try to login correct credentials" }); // Send error response if user not found
        }

        const passwordCompare = await bcrypt.compare(password, user.password); // Compare passwords

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Please try to login correct credentials" }); // Send error response if passwords don't match
        }

        const data = {
            id: user.id
        };
        const authToken = jwt.sign(data, JWT_SECRET); // Generate authentication token
        success = true; // Set success flag to true
        res.json({ success, authToken }); // Send success flag and authentication token in response
    } catch (error) {
        console.error(error.message); // Log error message
        res.status(500).send('Internal server Error Occurred'); // Send internal server error response
    }
});

// Route for resetting password via email
router.post('/login-reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await Member.findOne({ email }); // Find user by email
        if (!oldUser) {
            return res.status(400).json({ errors: "Please try to login correct credentials" }); // Send error response if user not found
        }
        const secret = JWT_SECRET + oldUser.password; // Generate secret key
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' }); // Generate token with expiration
        const link = `http://localhost:5000/api/auth/reset-password/${oldUser._id}/${token}`; // Reset password link
        try {
            var transporter = nodemailer.createTransport({
                
                // Use for TESTING BY mailosaur.com - mail tester  
                host: 'smtp.mailosaur.net',
                port: 587,
                secure: false,

                // Use for original email and password
                // service: 'gmail',
                auth: {
                    user: MyEmailId,
                    pass: MyPassword
                }
            });

            var mailOptions = {
                from: 'youremail@gmail.com',
                to: `${email},${oldUser.alterEmail}`,
                subject: 'DPRS RESET PASSWORD LINK', 
                text: `Hello ${oldUser.firstName} ${oldUser.lastName}, \n\nYou have requested to reset your DPRS (Daily Project Report System) password. Please use the following link to reset your password: \n\nDPRS RESET LINK: ${link} \n\nPlease note that this link is valid for 5 minutes only for security reasons. If you did not request this password reset or believe this to be a mistake, you can safely ignore this email. \n\nThank you. \n\nBest regards, \nDPRS TEAM \n\n`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    success = true; // Set success flag to true
                }
            });
            res.send({ success }); // Send success response
        } catch (error) {
            res.send({ success, error }); // Send error response
        }

    } catch (error) {
        console.error(error.message); // Log error message
        res.status(500).send('Internal server Error Occurred'); // Send internal server error response
    }
});

// Route for rendering reset password page
router.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    try {
        const oldUser = await Member.findOne({ _id: id });
        if (!oldUser) {
            return res.status(400).json({ errors: "Please try to login correct credentials" }); // Send error response if user not found
        }
        const secret = JWT_SECRET + oldUser.password; // Generate secret key
        const verify = jwt.verify(token, secret); // Verify token
        res.render("index", { email: verify.email, status: "Not Verified" }); // Render reset password page
    } catch (error) {
        console.error(error.message); // Log error message
        res.status(500).send('Internal server Error Occurred'); // Send internal server error response
    }
});

// Route for handling password reset
router.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
        const oldUser = await Member.findOne({ _id: id });
        if (!oldUser) {
            return res.status(400).json({ errors: "Please try to login correct credentials" }); // Send error response if user not found
        }
        const secret = JWT_SECRET + oldUser.password; // Generate secret key
        const verify = jwt.verify(token, secret); // Verify token
        const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
        const secPass = await bcrypt.hash(password, salt); // Hash new password
        let login = await Member.findByIdAndUpdate(id, { $set: { password: secPass } }, { new: true }); // Update user password
        res.render("index", { email: verify.email, status: "verified" }); // Render index page with verification status
    } catch (error) {
        console.error(error.message); // Log error message
        res.status(500).send('Internal server Error Occurred'); // Send internal server error response
    }
});

module.exports = router;
