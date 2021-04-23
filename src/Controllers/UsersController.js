// Local modules
const UserService = require('../services/UserService')
const AuthController = require('./AuthController')
const Users = require('../routes/Users')
const jwt = require('../helpers/jwt')

// Local class
const ApiError = require('../error/ApiError')

const fetchUsers = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res)
    await jwt.decodeAccessToken(req, res)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(403, "JWT decoding error")
    }

    await AuthController.verifyAction(req, 'users:list', res)

    Users.getUsers(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const getUser = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res)
    await jwt.decodeAccessToken(req, res)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(403, "JWT decoding error")
    }

    await AuthController.verifyAction(req, 'users:get-by-id', res)

    Users.getUser(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const createUser = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res)
    await jwt.decodeAccessToken(req, res)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(403, "JWT decoding error")
    }

    await AuthController.verifyAction(req, 'users:create-new', res)

    Users.createUser(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res)
    await jwt.decodeAccessToken(req, res)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(403, "JWT decoding error")
    }

    await AuthController.verifyAction(req, 'users:update-by-id', res)

    await UserService.isUserExist(req, res)

    if (!req.isUserExist) {
      throw ApiError.custom(404, "User not found")
    }

    Users.updateUser(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res)
    await jwt.decodeAccessToken(req, res)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(403, "JWT decoding error")
    }

    if (req.decoded.email === req.params.email) {
      throw ApiError.custom(403, "Impossible delete yourself")
    }

    await AuthController.verifyAction(req, 'users:delete-by-id', res)

    Users.deleteUser(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

module.exports = {
  fetchUsers: fetchUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
