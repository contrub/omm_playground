// Local modules
const MonumentsController = require('./Controllers/MonumentsController')
const AccountController = require('./Controllers/AccountController')
const UsersController = require('./Controllers/UsersController')
const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')

// Third party functions
const routes = require('express').Router()

if (process.env.NODE_ENV !== 'development') {

  //==============================Monuments==============================//

  routes.get('/monuments', Monuments.getMonuments)
  routes.get('/monuments/:id', Monuments.getMonument)

  routes.post('/monuments', Monuments.createMonument)

  routes.put('/monuments/:id', Monuments.updateMonument)

  routes.delete('/monuments/:id', Monuments.deleteMonument)
  // routes.delete('/monuments/db/all', Monuments.clearMonumentsDB)

  //================================Users================================//

  routes.get('/users', Users.getUsers)
  routes.get('/users/:email', Users.getUser)

  routes.put('/users/:email', Users.updateUser)

  routes.delete('/users/:email', Users.deleteUser)
  // routes.delete('/users/db/all', AccessController.verifyUser, AuthorizationController.UserDB, Users.clearUserDB)

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
