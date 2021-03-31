const routes = require('express').Router()

const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')

const UserService = require('./services/UserService')
const MonumentService = require('./services/MonumentService')

const AuthorizationController = require('./Controllers/AuthController')
const AccountController = require('./Controllers/AccountController')
const UsersController = require('./Controllers/UsersController')
const MonumentsController = require('./Controllers/MonumentsController')

const cloudinary = require('./utils/cloudinary')
const jwt = require('./helpers/jwt')

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

  routes.get('/api/monuments', MonumentsController.fetchMonuments)
  routes.get('/api/monuments/:id', MonumentsController.getMonument)

  routes.post('/api/monuments', MonumentsController.createMonument)

  routes.put('/api/monuments/:id', MonumentsController.updateMonument)

  routes.delete('/api/monuments/:id', MonumentsController.deleteMonument)
  // routes.delete('/api/monuments/db/all', Monuments.clearMonumentsDB)

  //================================UsersController================================//

  routes.get('/api/users', UsersController.fetchUsers)
  routes.get('/api/users/:email', UsersController.getUser)

  routes.post('/api/users', UsersController.createUser)

  routes.put('/api/users/:email', UsersController.updateUser)

  routes.delete('/api/users/:email', UsersController.deleteUser)
  // routes.delete('/api/users/db/all', Users.clearUserDB)

  //===============================AccountController===============================//

  routes.get('/role', AccountController.UserRole)

  routes.put('/reset_password_request/:email', AccountController.UpdatePasswordRequest)
  routes.put('/reset_password/:token', AccountController.UpdatePassword)

  routes.post('/signup', AccountController.SignUp)
  routes.post('/login', AccountController.SignIn)

}

module.exports = routes
