const { customer } = require('./routes/customers')
const { genre } = require('./routes/genres')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use('/api/genres', genre)
app.use('/api/customers', customer)

app.listen(port, () => console.log(`Listening on port: ${port}...`))