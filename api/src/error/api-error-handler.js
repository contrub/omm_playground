// Local class
const ApiError = require('./ApiError')

function apiErrorHandler(err, req, res, next) {

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({message: err.message})
  } else {
    res.status(500).send()
  }
}

module.exports = apiErrorHandler
