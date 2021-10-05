const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan') // logs requests
const helmet = require('helmet') // sets up different headers
const { log } = require('./middleware/logger') // custom middleware that logs events
const { course } = require('./routes/courses')
const { home } = require('./routes/home')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000 // PORT <= env variable

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.urlencoded({ extended: true })) // structures HTTP key/value pairs into JSON
app.use(express.static('public')) // creates a path to static resources (files/folders)
app.use(express.json()) // stringifies JSON objects
app.use('/api/courses', course)
app.use('/', home)

app.listen(port, () =>  console.log(`Listening on port ${port}...`))