const routes = require('express').Router()

const verifyToken = require('./utils/verifyToken')

const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')
const UserService = require('./helpers/UserService')
const AuthController = require('./Controllers/AuthController')

// Monuments

routes.get('get/monuments', verifyToken.AccessToken, Monuments.getMonuments)
routes.get('get/monuments/:id', verifyToken.AccessToken, Monuments.getMonument)

routes.post('post/monuments', Monuments.createMonument)

routes.put('put/monuments/:id', Monuments.updateMonument)

routes.delete('delete/monuments/:id', Monuments.deleteMonument)
routes.delete('delete/monuments/db/all', Monuments.clearMonumentsDB)

// Users

routes.get('get/users', Users.getUsers)
routes.get('get/users/:email', Users.getUser)

routes.post('/login', UserService.isUserDataExist, AuthController.getTokens)
routes.post('post/users', UserService.isUserExist, AuthController.getTokens, Users.createUser)

routes.put('put/users/:email', Users.updateUser)

routes.delete('delete/users/:email', Users.deleteUser)
routes.delete('delete/users/db/all', Users.clearUserDB)

module.exports = routes
