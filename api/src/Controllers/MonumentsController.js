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
  try {
    await AuthController.verifyAction(req, 'monuments:list', res)

    Monuments.getMonuments(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const getMonument = async (req, res, next) => {
  try {
    await MongoService.isIDValid(req, res, next)

    if (!req.isIDValid) {
      throw ApiError.custom(404, "Monument id validation error")
    }

    await AuthController.verifyAction(req, 'monuments:get-by-id', res, next)
    await MonumentService.isMonumentPayloadExist(req, {_id: req.params.id})

    if (!req.isMonumentExist) {
      throw ApiError.custom(404, "Monument not found")
    }

    Monuments.getMonument(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const createMonument = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res, next)
    await jwt.decodeAccessToken(req, res, next)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(403, "JWT decoding error")
    }

    await AuthController.verifyAction(req, 'monuments:create-new', res)

    await MonumentService.isMonumentPayloadExist(req, {name: req.body.name})

    if (req.isMonumentExist) {
      throw ApiError.custom(409, "Monument already exists")
    }

    await cloudinary.uploadImage(req, res)

    Monuments.createMonument(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const updateMonument = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res)
    await jwt.decodeAccessToken(req, res)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(403, "JWT decoding error")
    }

    await AuthController.verifyAction(req, 'monuments:update-by-id', res)
    await MongoService.isIDValid(req, res)

    if (!req.isIDValid) {
      throw ApiError.custom(404, "Monument id validation error")
    }

    await MonumentService.isMonumentPayloadExist(req, {_id: req.params.id})

    if (!req.isMonumentExist) {
      throw ApiError.custom(404, "Monument not found")
    }

    // await cloudinary.deleteImage(req, res)
    await cloudinary.uploadImage(req, res)

    Monuments.updateMonument(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const deleteMonument = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res)
    await jwt.decodeAccessToken(req, res)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(403, "JWT decoding error")
    }

    await AuthController.verifyAction(req, 'monuments:delete-by-id', res)
    await MongoService.isIDValid(req, res)

    if (!req.isIDValid) {
      throw ApiError.custom(404, "Monument id validation error")
    }

    await MonumentService.isMonumentPayloadExist(req, {_id: req.params.id})

    if (!req.isMonumentExist) {
      throw ApiError.custom(404, "Monument not found")
    }

    // await cloudinary.deleteImage(req, res)

    Monuments.deleteMonument(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

module.exports = {
  fetchMonuments: fetchMonuments,
  getMonument: getMonument,
  createMonument: createMonument,
  updateMonument: updateMonument,
  deleteMonument: deleteMonument
}
