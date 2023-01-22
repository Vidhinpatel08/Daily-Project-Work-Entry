const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a MemberNode Schema 
const ClientSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    ActiveStatus :{
        type: Boolean,
    },
});

module.exports = mongoose.model('client', ClientSchema)

