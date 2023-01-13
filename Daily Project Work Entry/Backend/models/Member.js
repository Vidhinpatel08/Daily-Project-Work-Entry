const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a MemberNode Schema 
const MemberSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userRole: {
        type: String,
        required: true
    },
    joindate: {
        type: String,
        default: '2000-01-01'
    },
    phone: {
        type: String,
        required: true
    },
    userDesignation: {
        type: String,
        required: true
    },
    alterPhone: {
        type: String,
    },
    alterEmail: {
        type: String,
    },
    department: {
        type: String,
        required: true
    },
    LeaveStartDate: {
        type: String,
        default: '2000-01-01'
    },
    LeaveEndDate: {
        type: String,
        default: '2000-01-01'
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('members', MemberSchema)

