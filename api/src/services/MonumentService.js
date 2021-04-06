// Local schema
const Monument = require('../models/Monument')

// Local class
const ApiError = require('../error/ApiError')

const isMonumentIDExist = async (req, res, next) => {
  const id = req.params.id

  await Monument
    .findById(id)
    .then((item) => {
      req.isMonumentExist = item === null || item === undefined ? false : true
    })
    .catch((err) => {
      next(ApiError.internal('MongoDB error'))
      console.log(err)
    })
}

const isMonumentNameExist = async (req, res, next) => {
  const name = req.body.name

  await Monument
    .find({name: name})
    .then((item) => {
      req.isMonumentExist = item === null || item === undefined ? false : true
    })
    .catch((err) => {
      next(ApiError.internal('MongoDB error'))
      console.log(err)
    })
}

module.exports = {
  isMonumentNameExist: isMonumentNameExist,
  isMonumentIDExist: isMonumentIDExist
}
