const routes = require('express').Router()

const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')
const UserService = require('./helpers/UserService')
const AuthController = require('./Controllers/AuthController')
const jwt = require('./utils/jwt')

// Monuments

routes.get('/get/monuments', jwt.verifyAccessToken, Monuments.getMonuments)
routes.get('/get/monuments/:id', jwt.verifyAccessToken, Monuments.getMonument)

routes.post('/post/monuments', jwt.verifyAccessToken, Monuments.createMonument)

routes.put('/put/monuments/:id', jwt.verifyAccessToken, Monuments.updateMonument)

routes.delete('/delete/monuments/:id', jwt.verifyAccessToken, Monuments.deleteMonument)
routes.delete('/delete/monuments/db/all', jwt.verifyAccessToken, Monuments.clearMonumentsDB)

// Users

routes.get('/get/users', jwt.verifyAccessToken, Users.getUsers)
routes.get('/get/users/:email', jwt.verifyAccessToken, Users.getUser)

// routes.post('/login', UserService.isUserDataExist, AuthController.getTokens)
routes.post('/post/users', UserService.isUserExist, UserService.isEmailCompliance, UserService.isPasswordCompliance, AuthController.getTokens, Users.createUser)

routes.put('/put/users/:email', jwt.verifyAccessToken, Users.updateUser)

routes.delete('/delete/users/:email', jwt.verifyAccessToken, Users.deleteUser)
routes.delete('/delete/users/db/all', jwt.verifyAccessToken, Users.clearUserDB)

module.exports = routes
