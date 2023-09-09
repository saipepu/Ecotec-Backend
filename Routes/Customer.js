const { getAll, update, customerById, deleteUser } = require('../controller/CustomerController');

const customer = require('express').Router()

customer.get('/getAllCustomer', getAll)
customer.put('/update/:customerId', update)
customer.delete('/delete/:customerId', deleteUser)

customer.param('customerId', customerById)

module.exports = customer
