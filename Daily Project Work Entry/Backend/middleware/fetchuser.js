const jwt = require('jsonwebtoken');
const JWT_SECRET = 'welcome$man' // create secret Key

const fetchuser = (req, res, next) => {
    // Get user form the jwt token and append id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"token Please authenticate useing vaild token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data;
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate useing vaild token"})        
    }
}

module.exports = fetchuser;

