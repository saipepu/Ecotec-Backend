const { ordersById, getAll, create, update, deleteOrders } = require('../controller/OrdersController');

const orders = require('express').Router()

orders.get('/getAll', getAll)
orders.post('/create', create)
orders.put('/update/:ordersId', update)
orders.delete('/delete/:ordersById', deleteOrders)

orders.param('ordersById', ordersById)

module.exports = orders;