const mongoose = require('mongoose');

// MongoDB atlas URI 
const mongoURI = "mongodb+srv://DPRSPROJECT:nfXkgsgbSslQYCkD@cluster0.fmrmjig.mongodb.net/DailyProjectWork?retryWrites=true&w=majority";

// Function to connect to MongoDB
const connectToMongo = () => { 
    mongoose.connect(mongoURI, () => {
        console.log('Connected to MongoDB successfully.');
    });
};

module.exports = connectToMongo;



// const mongoose = require('mongoose');

// // MongoDB URI 
// // const mongoURI = "mongodb://localhost:27017/DailyProjectWork?directConnection=true&readPreference=primary&appname=DailyProjectWork";

// // MongoDB atlas URI 
// const mongoURI = "mongodb+srv://DPRSPROJECT:nfXkgsgbSslQYCkD@cluster0.fmrmjig.mongodb.net/DailyProjectWork?retryWrites=true&w=majority";

// // Function to connect to MongoDB
// const connectToMongo = () => {
//     mongoose.connect(mongoURI, () => {
//         console.log('Connected to MongoDB successfully.');
//     });
// };

// module.exports = connectToMongo;


