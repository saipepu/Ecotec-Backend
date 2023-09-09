const { signIn, create, signUp } = require('../../controller/Auth/CustomerAuthController');

const customerAuth = require('express').Router()

customerAuth.post('/signup', signUp)
customerAuth.post('/signin', signIn)

module.exports = customerAuth;