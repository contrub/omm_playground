const routes = require('express').Router()

const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')

const UserService = require('./helpers/UserService')
const MonumentService = require('./helpers/MonumentService')

const AuthController = require('./Controllers/AuthController')
const AccessController = require('./Controllers/AccessController')

const jwt = require('./utils/jwt')
const cloudinary = require('./utils/cloudinary')

if (process.env.NODE_ENV !== 'development') {

  // Monuments

  routes.get('/monuments', Monuments.getMonuments) // ✅
  routes.get('/monuments/:id', Monuments.getMonument) // ✅

  routes.post('/monuments', jwt.verifyAccessToken, MonumentService.isMonumentExist, cloudinary.uploadImage, Monuments.createMonument)

  routes.put('/monuments/:id', jwt.verifyAccessToken, Monuments.updateMonument)

  routes.delete('/monuments/:id', jwt.verifyAccessToken, Monuments.deleteMonument)
  routes.delete('/monuments/db/all', jwt.verifyAccessToken, Monuments.clearMonumentsDB)

  // Users

  routes.get('/users', jwt.verifyAccessToken, Users.getUsers)
  routes.get('/users/:email', jwt.verifyAccessToken, Users.getUser)

  routes.post('/login', AuthController.login)
  routes.post('/users', UserService.isUserExist, UserService.isEmailCompliance, UserService.isPasswordCompliance, AuthController.getTokens, Users.createUser)

  routes.put('/users/:email', jwt.verifyAccessToken, Users.updateUser)

  routes.delete('/users/:email', jwt.verifyAccessToken, Users.deleteUser)
  routes.delete('/users/db/all', jwt.verifyAccessToken, Users.clearUserDB)

} else {

  //==============================Monuments==============================//

  routes.get('/monuments', Monuments.getMonuments)
  routes.get('/monuments/:id', Monuments.getMonument)

  routes.post('/monuments', AccessController.MonumentsDB, MonumentService.validateData, cloudinary.uploadImage, Monuments.createMonument)

  routes.put('/monuments/:id', AccessController.MonumentsDB, Monuments.updateMonument)

  routes.delete('/monuments/:id', AccessController.MonumentsDB, Monuments.deleteMonument)


  // В дальнейшем, думаю, данная возможность не потребуется, но для удобства тестирования, пока что, оставлю
  routes.delete('/monuments/db/all', AccessController.MonumentsDB, Monuments.clearMonumentsDB)

  //================================Users================================//

  routes.get('/users', AccessController.UsersDB, Users.getUsers)
  routes.get('/users/:email', AccessController.UsersDB, Users.getUser)

  routes.post('/login', UserService.isUserDataExist, AuthController.SignIn)
  routes.post('/signup', UserService.isUserExist, UserService.isEmailCompliance, UserService.isPasswordCompliance, AuthController.SignUp)

  // routes.post('/users', AccessController.UsersDB, UserService.isUserExist, UserService.isEmailCompliance, UserService.isPasswordCompliance, Users.createUser)

  routes.put('/users/:email', AccessController.UsersDB, Users.updateUser)

  routes.delete('/users/:email', AccessController.UsersDB, Users.deleteUser)

  // В дальнейшем, думаю, данная возможность не потребуется, но для удобства тестирования, пока что, оставлю
  routes.delete('/users/db/all', AccessController.UsersDB, Users.clearUserDB)
}

module.exports = routes
