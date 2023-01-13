const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' +  uniqueSuffix+".png")
    }
})

const uploadfile = multer({ storage: storage }).single('profile')
module.exports = uploadfile;


// enctype="multipart/form-data"