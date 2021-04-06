// Local schema
const Monument = require('../models/Monument')

// Local class
const ApiError = require('../error/ApiError')

const isMonumentExist = async (req, res, next) => {
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

module.exports = {
  isMonumentExist: isMonumentExist
}
