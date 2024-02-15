// Importing jwt module
const jwt = require('jsonwebtoken');

// Define JWT secret key
const JWT_SECRET = 'welcome$man'; // create secret Key

// Middleware function to fetch user from JWT token
const fetchuser = (req, res, next) => {
    // Get user from the jwt token and append id to req object
    const token = req.header('auth-token');
    if (!token) {
        // If token is not provided, send an error response
        res.status(401).send({ error: "Token required. Please authenticate using a valid token" });
    }
    try {
        // Verify the token and extract user data
        const data = jwt.verify(token, JWT_SECRET);
        // Append user data to req object
        req.user = data;
        // Call the next middleware
        next();
    } catch (error) {
        // If token is invalid, send an error response
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

// Export the fetchuser middleware
module.exports = fetchuser;
