// Local class
const ApiError = require('./ApiError')

function apiErrorHandler(err, req, res, next) {

  if (err instanceof ApiError) {
    res.status(err.code).json({message: err.message})
    return;
  }

  res.sendStatus(500)
}

module.exports = apiErrorHandler
