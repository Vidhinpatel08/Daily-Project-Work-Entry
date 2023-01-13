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
    }
});

module.exports = mongoose.model('client', ClientSchema)

