const { getAll, create, update, customerById, deleteUser } = require('../controller/CustomerController');
const connection = require('../databasepg');

const customer = require('express').Router()

customer.get('/getAllCustomer', getAll)
customer.post('/create', create)
customer.put('/update/:customerId', update)
customer.delete('/delete/:customerId', deleteUser)

customer.param('customerId', customerById)

module.exports = customer
