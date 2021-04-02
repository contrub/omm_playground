// Local class
const ApiError = require('../error/ApiError')

// Third party modules
const mongoose = require('mongoose')

const isIDValid = async (req, res, next) => {
  const id = req.params.id

  if (!id) {
    next(ApiError.custom(404, 'Monument id undefined'))
  }

  const isValid = mongoose.Types._ObjectId.isValid(id)

  if (!isValid) {
    req.isIDValid = false
  } else {
    req.isIDValid = true
  }
}

module.exports = {
  isIDValid: isIDValid
}
