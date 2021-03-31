// Local functions
const MonumentService = require('../services/MonumentService')
const AuthController = require('./AuthController')
const cloudinary = require('../utils/cloudinary')
const Monuments = require('../routes/Monuments')
const jwt = require('../helpers/jwt')

// Local class
const ApiError = require('../error/ApiError')

const fetchMonuments = async (req, res) => {
  Monuments.getMonuments(req, res)
}

const getMonument = async (req, res, next) => {

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

  req.body.email = req.decoded.email

  await AuthController.MonumentsDB(req, res, next)
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

  req.body.email = req.decoded.email

  await AuthController.UserDB(req, res, next)
  await MonumentService.isMonumentExist(req, res, next)

  if (!req.isMonumentExist) {
    next(ApiError.custom(404, 'Monument undefined'))
    return
  }

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

  req.body.email = req.decoded.email

  await AuthController.UserDB(req, res, next)
  await MonumentService.isMonumentExist(req, res, next)

  if (!req.isMonumentExist) {
    next(ApiError.custom(404, 'Monument undefined'))
    return
  }

  Monuments.deleteMonument(req, res)
}

module.exports = {
  fetchMonuments: fetchMonuments,
  getMonument: getMonument,
  createMonument: createMonument,
  updateMonument: updateMonument,
  deleteMonument: deleteMonument
}
