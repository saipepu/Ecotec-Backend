const { orders_itemById, getAll, create, update, deleteOrderItem, getByOrderId } = require('../controller/OrdersItemController');

const order_item = require('express').Router()

order_item.get('/getAll', getAll)
order_item.get('/getByOrderId', getByOrderId)
order_item.post('/create', create)
order_item.put('/update/:orders_itemById', update)
order_item.delete('/delete/:orders_itemById', deleteOrderItem)

order_item.param('orders_itemById', orders_itemById)

module.exports = order_item;