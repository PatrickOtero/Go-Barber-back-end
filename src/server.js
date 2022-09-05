require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const swaggerUi = require('swagger-ui-express')

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

module.exports = app
