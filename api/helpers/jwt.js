// Local class
const ApiError = require('../error/ApiError')

// Third party module
const jwt = require('jsonwebtoken')

generateAccessToken = (req, payload, next, options={}) => {
  try {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options)

    req.accessToken = token
  } catch (err) {
    next(ApiError.custom(403, 'AccessToken generate error'))
    console.log(err)
  }
}

decodeAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (authHeader === undefined) {
    res.status(401).json({message: 'AccessToken undefined'})
  } else {
    const accessToken = req.headers.authorization.split(' ')[1]

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next(ApiError.custom(403, 'AccessToken decode error'))
        console.log(err)
      } else if (decoded) {
        req.decoded = decoded
      }
    })
  }
}

verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  
  if (authHeader === undefined) {
    next(ApiError.custom(401, 'AccessToken undefined'))
  } else {
    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next(ApiError.custom(403, 'AccessToken validation error'))
        console.log(err)
      }
    })
  }
}

module.exports = {
  generateAccessToken: generateAccessToken,
  verifyAccessToken: verifyAccessToken,
  decodeAccessToken: decodeAccessToken
}
