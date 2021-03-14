const routes = require('express').Router()

const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')

const UserService = require('./services/UserService')
const MonumentService = require('./services/MonumentService')

const AuthorizationController = require('./Controllers/AuthorizationController')
const AccessController = require('./Controllers/AccessController')
const UserController = require('./Controllers/UserController')

const cloudinary = require('./utils/cloudinary')

const validator = require('./helpers/validator')
const db = require('./helpers/db')

if (process.env.NODE_ENV !== 'development') {

  //==============================Monuments==============================//

  routes.get('/monuments', Monuments.getMonuments)
  routes.get('/monuments/:id', Monuments.getMonument)

  routes.post('/monuments', AccessController.verifyUser, AuthorizationController.UserDB, MonumentService.isMonumentExist, MonumentService.validateData, cloudinary.uploadImage, Monuments.createMonument)

  routes.put('/monuments/:id', AccessController.verifyUser, AuthorizationController.MonumentsDB, Monuments.updateMonument)

  routes.delete('/monuments/:id', AccessController.verifyUser, AuthorizationController.MonumentsDB, Monuments.deleteMonument)
  routes.delete('/monuments/db/all', AccessController.verifyUser, AuthorizationController.MonumentsDB, Monuments.clearMonumentsDB)

  //================================Users================================//

  routes.get('/users', AccessController.verifyUser, AuthorizationController.UserDB, Users.getUsers)
  routes.get('/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.getUser)

  routes.post('/login', UserService.isUserDataExist, UserController.SignIn)
  routes.post('/signup', UserService.isUserExist, UserService.isEmailCompliance, UserService.isPasswordCompliance, UserController.SignUp)

  routes.put('/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.updateUser)

  routes.delete('/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.deleteUser)

  routes.delete('/users/db/all', AccessController.verifyUser, AuthorizationController.UserDB, Users.clearUserDB)

} else {

  //==============================Monuments==============================//

  routes.get('/api/monuments', Monuments.getMonuments) // ✅
  routes.get('/api/monuments/:id', Monuments.getMonument) // ✅

  routes.post('/api/monuments', AccessController.verifyUser, AuthorizationController.MonumentsDB, MonumentService.isMonumentExist, MonumentService.validateData, cloudinary.uploadImage, Monuments.createMonument)

  routes.put('/api/monuments/:id', AccessController.verifyUser, AuthorizationController.MonumentsDB, Monuments.updateMonument)

  routes.delete('/api/monuments/:id', AccessController.verifyUser, AuthorizationController.MonumentsDB, Monuments.deleteMonument)
  // routes.delete('/api/monuments/db/all', Monuments.clearMonumentsDB)

  //================================Users================================//

  routes.get('/api/users', AccessController.verifyUser, AuthorizationController.UserDB, Users.getUsers)
  routes.get('/api/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.getUser)

  routes.get('/role', UserService.getRole)

  routes.post('/login', db.isUserDataExist, UserController.SignIn)
  routes.post('/signup', db.isUserExist, validator.isEmailCompliance, validator.isPasswordCompliance, UserController.SignUp)
  routes.post('/api/users', AccessController.verifyUser, AuthorizationController.UserDB, db.isUserExist, Users.createUser)

  routes.put('/api/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.updateUser)
  routes.put('/reset/:email', db.isUserExist, UserService.resetPassword)

  routes.delete('/api/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.deleteUser)
  // routes.delete('/api/users/db/all', Users.clearUserDB)
}

module.exports = routes
