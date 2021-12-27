const express = require('express')
const dotenv = require('dotenv')
const loader = require('./loaders')
const morgan = require('morgan')
const assignmentRouter = require('./routes/filterdata')
const {unknownEndpoint} = require('./middlewares/unknownEndpoint')

//load env file and start connection to mongodb
dotenv.config()
loader()

const app = express()
app.use(express.json())

//log requests
morgan.token('reqbody', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status Req.Body: :reqbody - :response-time ms - :res[content-length]'))

//route management
app.use('/filterdata',assignmentRouter)
app.use(unknownEndpoint)

module.exports = app