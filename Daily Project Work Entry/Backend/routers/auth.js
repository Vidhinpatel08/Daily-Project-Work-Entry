const express = require("express");
const router = express.Router();
// const User = require('../models/User')
const Member = require('../models/Member')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
var nodemailer = require('nodemailer');

let MyPassword = 'xxxxxxxxx'
let MyEmailId = 'xxxxxxxxx'
const JWT_SECRET = 'welcome$man' // create secret Key
let success = false //if you sucessfully pass Api then Successs true

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userid = req.user.id;
        const user = await Member.findById(userid).select("-password")
        success = true
        res.json({ success, user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }

});


//  ROUTE - 5 :     update an Verify : PUT "api/projrct/updateproject/:id". Login required
router.put('/resetPassword/:id', async (req, res) => {

    try {

        const salt = await bcrypt.genSalt(10); // return Promise
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create a note object
        const newdprs = { password: secPass };

        // Find the note to updated to update it 
        let authentic = await Member.findById(req.params.id)

        // if note not found
        if (!authentic) {
            return res.status(404).send({ Error: "Project Not found" })
        }

        // if note Exists 
        let member = await Member.findByIdAndUpdate(req.params.id, { $set: newdprs }, { new: true })
        success = true
        res.send({ "success": "Project has been Edited successfully", success })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success, Error: 'Internal server Error Occure' })
    }
});


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

// Api for ResetPassword 
router.post('/login-reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await Member.findOne({ email })
        if (!oldUser) {
            return res.status(400).json({ errors: "Please try to login correct credentials" });
        }
        const secret = JWT_SECRET + oldUser.password
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' });
        const link = `http://localhost:5000/api/auth/reset-password/${oldUser._id}/${token}`
        success = true

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: MyEmailId,
              pass: MyPassword
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: `${email},${oldUser.alterEmail}`,
            subject: 'DPRS RESET PASSWORD LINK',
            text: `Hello Dear,${oldUser.firstName} ${oldUser.lastName}\n\nDPRS RESET LINK : ${link}\n\nNOTE: Link is Valid till 5 Mintes\n\nThankyou sir.`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.send({ success })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }
})

router.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params
    try {
        const oldUser = await Member.findOne({ _id: id })
        if (!oldUser) {
            return res.status(400).json({ errors: "Please try to login correct credentials" });
        }
        const secret = JWT_SECRET + oldUser.password
        const verify = jwt.verify(token, secret)
        res.render("index", { email: verify.email, status: "Not Verified" })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }

})

router.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body
    try {
        const oldUser = await Member.findOne({ _id: id })
        if (!oldUser) {
            return res.status(400).json({ errors: "Please try to login correct credentials" });
        }
        const secret = JWT_SECRET + oldUser.password
        const verify = jwt.verify(token, secret)
        const salt = await bcrypt.genSalt(10); // return Promise
        const secPass = await bcrypt.hash(password, salt)
        let login = await Member.findByIdAndUpdate(id, { $set: {password:secPass} }, { new: true })
        res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server Error Occure')
    }

})



module.exports = router
