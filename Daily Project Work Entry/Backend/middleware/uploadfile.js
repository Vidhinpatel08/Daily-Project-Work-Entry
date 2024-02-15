// Importing required modules
const express = require('express');
const multer = require('multer');

// Setting up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ".png");
    }
});

// Creating multer instance for file upload
const uploadfile = multer({ storage: storage }).single('profile');

// Exporting the multer middleware for file upload
module.exports = uploadfile;

// Note: enctype="multipart/form-data" is required in the HTML form for file uploads
