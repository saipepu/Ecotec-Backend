// const { getAll, create, update, customerById, deleteUser } = require('../controller/CustomerController');
const { getAll, create, chefById, update, deleteUser } = require('../controller/ChefController');
const connection = require('../databasepg');

const chef = require('express').Router()

chef.get('/getAll', getAll)
chef.post('/create', create)
chef.put('/update/:chefId', update)
chef.delete('/delete/:chefId', deleteUser)

chef.param('chefId', chefById)

module.exports = chef
