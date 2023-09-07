const { getAll } = require('../controller/CategoryController')

const category = require('express').Router()

category.get('/getAll', getAll)

module.exports = category