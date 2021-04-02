// Local class
const ApiError = require('../error/ApiError')

// Third party modules
const {ObjectId} = require('mongodb')

const isIDValid = (req, res, next) => {
  const id = req.params.id

  console.log(id)

  if (!id) {
    next(ApiError.custom(404, 'Monument id undefined'))
  }

  if (new ObjectId(id).toString() !== id) {
    req.isIDValid = false
  } else {
    req.isIDValid = true
  }
}

module.exports = {
  isIDValid: isIDValid
}
