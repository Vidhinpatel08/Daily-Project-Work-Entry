const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

// connect with database
connectToMongo();


const app = express()
const port = 5000

// MiddleWare : req, res object handle
app.use(express.json())
app.set("view engine", "ejs")
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }));


// Available Routes 
app.use('/api/auth', require('./routers/auth'))
app.use('/api/member', require('./routers/member'))
app.use('/api/project', require('./routers/project'))
app.use('/api/client', require('./routers/client'))
app.use('/api/dprs', require('./routers/dprs'))


app.listen(port, () => {
  console.log(`Daily Project Work Entry Panel listening at http://localhost:${port}`)
})