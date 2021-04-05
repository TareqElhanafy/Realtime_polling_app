const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const poll = require('./routers/poll')

const app = express()

//setting the static files
app.use(express.static(path.join(__dirname + '/public')))


//bodyparser middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//enable cors
app.use(cors())

//Routes
app.use('/poll', poll)

//setting the port
app.listen(process.env.PORT, () => {
    console.log(`server starts at port ${process.env.PORT}`);
})