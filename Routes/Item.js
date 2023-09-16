const { getAll } = require('../controller/ItemController')

const item = require('express').Router()

item.get('/getAll', getAll)

module.exports = item