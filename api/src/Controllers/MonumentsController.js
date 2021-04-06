// Local functions
const MonumentService = require('../services/MonumentService')
const MongoService = require('../services/MongoService')
const AuthController = require('./AuthController')
const cloudinary = require('../utils/cloudinary')
const Monuments = require('../routes/Monuments')
const jwt = require('../helpers/jwt')


// Local class
const ApiError = require('../error/ApiError')

const fetchMonuments = async (req, res, next) => {
  await AuthController.verifyAction(req, 'monuments:list', res, next)
  Monuments.getMonuments(req, res)
}

const getMonument = async (req, res, next) => {

  await MongoService.isIDValid(req, res, next)

  if (!req.isIDValid) {
    next(ApiError.custom(404, 'Monument id validation error'))
  }

  await AuthController.verifyAction(req, 'monuments:get-by-id', res, next)
  await MonumentService.isMonumentExist(req, res, next)

  if (!req.isMonumentExist) {
    next(ApiError.custom(404, 'Monument undefined'))
    return
  }

  Monuments.getMonument(req, res)
}

const createMonument = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    next(ApiError.custom(403, 'Email payload undefined in JWT'))
    return
  }

  await AuthController.verifyAction(req, 'monuments:create-new', res, next)
  await cloudinary.uploadImage(req, res, next)

  Monuments.createMonument(req, res)
}

const updateMonument = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    next(ApiError.custom(403, 'Email payload undefined in JWT'))
    return
  }

  await AuthController.verifyAction(req, res, next)
  await MongoService.isIDValid(req, 'monuments:update-by-id', res, next)

  if (!req.isIDValid) {
    next(ApiError.custom(404, 'Monument id validation error'))
  }

  await MonumentService.isMonumentExist(req, res, next)

  if (!req.isMonumentExist) {
    next(ApiError.custom(404, 'Monument undefined'))
    return
  }

  await cloudinary.deleteImage(req, res, next)
  await cloudinary.uploadImage(req, res, next)

  Monuments.updateMonument(req, res)
}

const deleteMonument = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    next(ApiError.custom(403, 'Email payload undefined in JWT'))
    return
  }

  await AuthController.verifyAction(req, res, 'monuments:delete-by-id', next)
  await MongoService.isIDValid(req, res, next)

  if (!req.isIDValid) {
    next(ApiError.custom(404, 'Monument id validation error'))
  }

  await MonumentService.isMonumentExist(req, res, next)

  if (!req.isMonumentExist) {
    next(ApiError.custom(404, 'Monument undefined'))
    return
  }

  await cloudinary.deleteImage(req, res, next)

  Monuments.deleteMonument(req, res)
}

module.exports = {
  fetchMonuments: fetchMonuments,
  getMonument: getMonument,
  createMonument: createMonument,
  updateMonument: updateMonument,
  deleteMonument: deleteMonument
}
