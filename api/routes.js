const routes = require('express').Router()

const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')
const UserService = require('./helpers/UserService')
const AuthController = require('./Controllers/AuthController')
const jwt = require('./utils/jwt')

// remove get, post, delete, put from paths

if (process.env.NODE_ENV !== 'development') {
  routes.get('/monuments', jwt.verifyAccessToken, Monuments.getMonuments)
  routes.get('/monuments/:id', jwt.verifyAccessToken, Monuments.getMonument)

  routes.post('/monuments', jwt.verifyAccessToken, Monuments.createMonument)

  routes.put('/monuments/:id', jwt.verifyAccessToken, Monuments.updateMonument)

  routes.delete('/monuments/:id', jwt.verifyAccessToken, Monuments.deleteMonument)
  routes.delete('/monuments/db/all', jwt.verifyAccessToken, Monuments.clearMonumentsDB)

// Users

// create paths /refreshtoken, /signup, /login

  routes.get('/users', jwt.verifyAccessToken, Users.getUsers)
  routes.get('/users/:email', jwt.verifyAccessToken, Users.getUser)

  routes.post('/login', UserService.isUserDataExist, AuthController.getTokens)
  routes.post('/users', UserService.isUserExist, UserService.isEmailCompliance, UserService.isPasswordCompliance, AuthController.getTokens, Users.createUser)

  routes.put('/users/:email', jwt.verifyAccessToken, Users.updateUser)

  routes.delete('/users/:email', jwt.verifyAccessToken, Users.deleteUser)
  routes.delete('/users/db/all', jwt.verifyAccessToken, Users.clearUserDB)
} else {
  routes.get('/monuments', Monuments.getMonuments)
  routes.get('/monuments/:id', Monuments.getMonument)

  routes.post('/monuments', Monuments.createMonument)

  routes.put('/monuments/:id', Monuments.updateMonument)

  routes.delete('/monuments/:id', Monuments.deleteMonument)
  routes.delete('/monuments/db/all', Monuments.clearMonumentsDB)

// Users

// create paths /refreshtoken, /signup, /login

  routes.get('/users', Users.getUsers)
  routes.get('/users/:email', Users.getUser)

  routes.post('/login', AuthController.login)
  routes.post('/users', AuthController.getTokens, Users.createUser)

  routes.put('/users/:email', jwt.verifyAccessToken, Users.updateUser)

  routes.delete('/users/:email', jwt.verifyAccessToken, Users.deleteUser)
  routes.delete('/users/db/all', jwt.verifyAccessToken, Users.clearUserDB)
}

module.exports = routes
