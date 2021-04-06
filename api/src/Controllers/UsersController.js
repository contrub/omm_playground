// Local modules
const UserService = require('../services/UserService')
const AuthController = require('./AuthController')
const Users = require('../routes/Users')
const jwt = require('../helpers/jwt')

// Local class
const ApiError = require('../error/ApiError')

const fetchUsers = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    next(ApiError.custom(403, 'Email payload undefined in JWT'))
    return
  }

  await AuthController.verifyAction(req, 'users:list', res, next)

  Users.getUsers(req, res)
}

const getUser = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    next(ApiError.custom(403, 'Email payload undefined in JWT'))
    return
  }

  await AuthController.verifyAction(req, 'users:get-by-id', res, next)

  Users.getUser(req, res)
}

const createUser = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    next(ApiError.custom(403, 'Email payload undefined in JWT'))
    return
  }

  await AuthController.verifyAction(req, 'users:create-new', res, next)

  Users.createUser(req, res)
}

const updateUser = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    next(ApiError.custom(403, 'Email payload undefined in JWT'))
    return
  }

  await AuthController.verifyAction(req, 'users:update-by-id', res, next)

  await UserService.isUserExist(req, res, next)

  if (!req.isUserExist) {
    next(ApiError.custom(404, 'Updated user undefined'))
    return
  }

  Users.updateUser(req, res)
}

const deleteUser = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    next(ApiError.custom(403, 'Email payload undefined in JWT'))
    return
  }

  await AuthController.verifyAction(req, 'users:delete-by-id', res, next)

  Users.deleteUser(req, res)
}

module.exports = {
  fetchUsers: fetchUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
