const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = "mongodb://localhost:27017/DailyProjectWork?directConnection=true&readPreference=primary&appname=DailyProjectWork";

// Function to connect to MongoDB
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to MongoDB successfully.');
    });
};

module.exports = connectToMongo;
