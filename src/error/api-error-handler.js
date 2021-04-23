// Local class
const ApiError = require('./ApiError')

function apiErrorHandler(err, req, res, next) {

  if (err instanceof ApiError) {
    res.status(err.statusCode).send(err.message)
  } else {
    res.status(500).send(err.message)
  }
}

module.exports = apiErrorHandler
