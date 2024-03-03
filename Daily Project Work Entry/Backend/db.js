const mongoose = require('mongoose');

// MongoDB atlas URI 
const mongoURI = process.env.MONGO_DB_URL;

// Function to connect to MongoDB
const connectToMongo = () => { 
    mongoose.connect(mongoURI, () => {
        console.log('Connected to MongoDB successfully.');
    });
};

module.exports = connectToMongo;