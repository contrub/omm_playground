// Local class
const ApiError = require('../error/ApiError')

// Third party modules
const mongoose = require('mongoose');

const isIDValid = (req, res) => {

  if (req.params === undefined) {
    throw ApiError.custom(404, 'Monument id undefined')
  }

  const id = req.params.id
  const isValid = mongoose.Types.ObjectId.isValid(id)

  if (!isValid) {
    req.isIDValid = false
  } else {
    req.isIDValid = true
  }
}

module.exports = {
  isIDValid: isIDValid
}
