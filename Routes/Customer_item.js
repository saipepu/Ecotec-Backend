const { customerById } = require('../controller/CustomerController')
const { getItemByCustomerId, create } = require('../controller/CustomerItemController')

const customer_item = require('express').Router()

customer_item.get("/get/:customer_id", getItemByCustomerId)
customer_item.post("/create", create)

customer_item.param("customer_id", customerById)

module.exports = customer_item;