const router = require('express')('Router')
const mongoose = require('mongoose')
const Joi = require('joi')

  const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 10
    },
    isGold: { 
      type: Boolean,
      default: false 
    }
  }))

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name')
  res.send(customers)
})

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = new Customer({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold })
  const result = await customer.save()
  
  res.send(result)
})

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold }, {
    new: true
  })

  if (!customer) return res.status(404).send('The customer with the given ID was not found.')
  
  res.send(customer)
})

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)
  
  if (!customer) return res.status(404).send('The customer with the given ID was not found.')
  
  res.send(customer)
})

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if(!customer) return res.status(404).send('This customer does not exist in our database at this time.')

  res.send(customer)
})

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(3).max(25).required(),
    phone: Joi.string().min(7).max(10).required(),
    isGold: Joi.boolean()
  }
  return Joi.validate(customer, schema)
}

module.exports = {
  customer: router
}