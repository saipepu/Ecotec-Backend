const { signUp, signIn } = require('../../controller/Auth/ChefAuthController');

const chefAuth = require('express').Router()

chefAuth.post('/signup', signUp)
chefAuth.post('/signin', signIn)

module.exports = chefAuth;