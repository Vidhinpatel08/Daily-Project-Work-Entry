const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a MemberNode Schema 
const ProjectSchema = new Schema({
    projectName:{
        type: String,
        required: true
    }, 
    clientName:{
        type: String,    
    }, 
    member:{
        type: String,    
    }, 
    durationHours:{
        type: String,    
    }, 
    durationType:{
        type: String,    
    }, 
    limithours:{
        type: String,    
    }, 
    technologies:{
        type: String,    
    }, 
    projectManager:{
        type: String,
        required: true
    }, 
    type:{
        type: String,
        required: true    
    }, 
    projectDescription:{
        type: String,
    }, 
});

module.exports = mongoose.model('project', ProjectSchema)

