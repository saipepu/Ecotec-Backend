const { getAll, create, update, restaurantId, deleteRestaurant } = require('../controller/RestaurantController');
const connection = require('../databasepg');

const restaurant = require('express').Router()

restaurant.get('/getAllRestaurant', getAll)
restaurant.post('/create', create)
restaurant.put('/update/:restaurantId', update)
restaurant.delete('/delete/:restaurantId', deleteRestaurant)

restaurant.param('restaurantId', restaurantId)

module.exports = restaurant
