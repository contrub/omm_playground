const routes = require('express').Router()

const verifyToken = require('./utils/verifyToken')

const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')

routes.get('/monuments', verifyToken.AccessToken, Monuments.getMonuments)
routes.get('/monuments/:id', verifyToken.AccessToken, Monuments.getMonument)
routes.put('/monuments/:id', Monuments.updateMonument)
routes.delete('/monuments/:id', Monuments.deleteMonument)
routes.delete('/monuments/all', Monuments.clearMonumentsDB)

routes.get('/users', Users.getUsers)
routes.get('/users/:id', Users.getUser)
routes.post('/users', Users.createUser)
routes.put('/users/:id', Users.updateUser)
routes.delete('/users/:id', Users.deleteUser)
routes.delete('/users/all', Users.clearUserDB)

module.exports = routes
