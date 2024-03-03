require('dotenv').config()

// Importing necessary modules
const connectToMongo = require('./db'); // Importing database connection function
const express = require('express'); // Importing express framework
var cors = require('cors'); // Importing CORS middleware for handling cross-origin requests

// Connect with the database
connectToMongo();

// Creating an express application
const app = express();
const port = process.env.PORT || 5000; // Port number for the server to listen on
const HOST = process.env.HOST_NAME

// Middleware setup
app.use(express.json()); // Middleware to parse JSON bodies
app.set("view engine", "ejs"); // Setting view engine to EJS
app.use(cors()); // Middleware for enabling CORS
app.use('/uploads', express.static('uploads')); // Middleware to serve static files from the 'uploads' directory
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies

// Routes setup
app.use('/api/auth', require('./routers/auth')); // Route for authentication
app.use('/api/member', require('./routers/member')); // Route for managing members
app.use('/api/project', require('./routers/project')); // Route for managing projects
app.use('/api/client', require('./routers/client')); // Route for managing clients
app.use('/api/dprs', require('./routers/dprs')); // Route for managing DPRs (Daily Progress Reports)

// Start the server
app.listen(port, () => {
  console.log(`Daily Project Work Entry Panel listening at ${HOST}${port}`); // Logging server start message
});
