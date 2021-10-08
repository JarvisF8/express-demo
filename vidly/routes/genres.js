const router = require('express')('Router')
const mongoose = require('mongoose')
const Joi = require('joi')

  const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  }))

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres)
})

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = new Genre({ name: req.body.name })
  const result = await genre.save()
  
  res.send(result)
})

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  })

  if (!genre) return res.status(404).send('The genre with the given ID was not found.')
  
  res.send(genre)
})

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  
  if (!genre) return res.status(404).send('The genre with the given ID was not found.')
  
  res.send(genre)
})

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)

  if(!genre) return res.status(404).send('This genre does not exist in our database at this time.')

  res.send(genre)
})

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, schema)
}

module.exports = {
  genre: router
}