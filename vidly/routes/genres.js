const router = require('express')('Router')
const Joi = require('joi')

const genres = [
  { id: 1, name: 'Comedy' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Action' }
]

router.get('/', (req, res) => {
  res.send(genres)
})

router.get('/:id', (req, res) => {
  const genre = genres.find(({ id }) => id ===  parseInt(req.params.id))
  if(!genre) return res.status(404).send('This genre does not exist in our database at this time.')

  res.send(genre)
})

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }

  genres.push(genre)
  res.send(genre)
})

router.put('/:id', (req, res) => {
  const genre = genres.filter(({ id }) => id ===  parseInt(req.params.id))[0]
  if(!genre) return res.status(404).send('This genre does not exist in our database at this time.')
  
  const { error } = validateGenre(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  genre.name = req.body.name
  res.send(genre)
})

router.delete('/:id', (req, res) => {
  const genre = genres.filter(({ id }) => id ===  parseInt(req.params.id))[0]
  if(!genre) return res.status(404).send('This genre does not exist in our database at this time.')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)
  
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