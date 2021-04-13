// Local schema
const Monument = require('../models/Monument')

// Local class
const ApiError = require('../error/ApiError')

const isMonumentPayloadExist = async (req, payload) => {
  await Monument
    .find(payload)
    .then((monument) => {
      req.isMonumentExist = monument.length ? true : false
    })
    .catch((err) => {
      console.log(err)
      throw ApiError.internal('MongoDB error')
    })
}

module.exports = {
  isMonumentPayloadExist: isMonumentPayloadExist
}
