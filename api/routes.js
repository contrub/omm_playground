// Local modules
const MonumentsController = require('./src/Controllers/MonumentsController')
const AccountController = require('./src/Controllers/AccountController')
const UsersController = require('./src/Controllers/UsersController')

// Third party functions
const routes = require('express').Router()

if (process.env.NODE_ENV !== 'development') {

  //==============================MonumentsController==============================//

  routes.get('/api/monuments', MonumentsController.fetchMonuments)
  routes.get('/api/monuments/:id', MonumentsController.getMonument)

  routes.post('/api/monuments', MonumentsController.createMonument)

  routes.put('/api/monuments/:id', MonumentsController.updateMonument)

  routes.delete('/api/monuments/:id', MonumentsController.deleteMonument)

  //================================UsersController================================//

  routes.get('/api/users', UsersController.fetchUsers)
  routes.get('/api/users/:email', UsersController.getUser)

  routes.post('/api/users', UsersController.createUser)

  routes.put('/api/users/:email', UsersController.updateUser)

  routes.delete('/api/users/:email', UsersController.deleteUser)

  //===============================AccountController===============================//

  routes.get('/role', AccountController.UserRole)

  routes.put('/reset_password_request/:email', AccountController.UpdatePasswordRequest)
  routes.put('/reset_password/:token', AccountController.UpdatePassword)

  routes.post('/signup', AccountController.SignUp)
  routes.post('/login', AccountController.SignIn)

} else {

  //==============================MonumentsController==============================//

  routes.get('/api/monuments', MonumentsController.fetchMonuments)
  routes.get('/api/monuments/:id', MonumentsController.getMonument)

  routes.post('/api/monuments', MonumentsController.createMonument)

  routes.put('/api/monuments/:id', MonumentsController.updateMonument)

  routes.delete('/api/monuments/:id', MonumentsController.deleteMonument)

  //================================UsersController================================//

  routes.get('/api/users', UsersController.fetchUsers)
  routes.get('/api/users/:email', UsersController.getUser)

  routes.post('/api/users', UsersController.createUser)

  routes.put('/api/users/:email', UsersController.updateUser)

  routes.delete('/api/users/:email', UsersController.deleteUser)

  //===============================AccountController===============================//

  routes.get('/role', AccountController.UserRole)

  routes.put('/reset_password_request/:email', AccountController.UpdatePasswordRequest)
  routes.put('/reset_password/:token', AccountController.UpdatePassword)

  routes.post('/signup', AccountController.SignUp)
  routes.post('/login', AccountController.SignIn)

}

module.exports = routes
