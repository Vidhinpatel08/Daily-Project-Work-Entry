const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a MemberNode Schema 
const DPRSSchema = new Schema({
    member: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    workHour: {
        type: String,
        required: true
    },
    managementHour: {
        type: String,
        required: true
    },
    inTime: {
        type: String,
        required: true
    },
    outTime: {
        type: String,
        required: true
    },
    dprsDescription: {
        type: String,
        required: true
    },
    isVarify:{
        type: Boolean,
        default : false
    }
});

module.exports = mongoose.model('dprs', DPRSSchema)

