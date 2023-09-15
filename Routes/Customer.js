const { getAll, update, customerById, deleteUser, updatePoints } = require('../controller/CustomerController');

const customer = require('express').Router()

customer.get('/getAllCustomer', getAll)
customer.put('/update/:customerId', update)
customer.put('/updatePoints/:customerId', updatePoints)
customer.delete('/delete/:customerId', deleteUser)

customer.param('customerId', customerById)

module.exports = customer
