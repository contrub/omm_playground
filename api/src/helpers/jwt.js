// Local class
const ApiError = require('../error/ApiError')

// Third party module
const jwt = require('jsonwebtoken')

generateAccessToken = (req, payload, options={}) => {
  try {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options)

    req.accessToken = token
  } catch (err) {
    // console.log(err)
    throw ApiError.custom(403, "AccessToken generate error")
  }
}

decodeAccessToken = (req, res) => {
  const authHeader = req.headers['authorization']

  if (authHeader === undefined) {
    throw ApiError.custom(401, "AccessToken undefined")
  } else {
    const accessToken = req.headers.authorization.split(' ')[1]

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // console.log(err)
        throw ApiError.custom(403, "JWT decode error")
      } else if (decoded) {
        req.decoded = decoded
      }
    })
  }
}

verifyAccessToken = (req, res) => {
  const authHeader = req.headers['authorization']

  if (authHeader === undefined) {
    throw ApiError.custom(401, "AccessToken undefined")
  } else {
    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // console.log(err)
        throw ApiError.custom(403, "JWT validation error")
      }
    })
  }
}

module.exports = {
  generateAccessToken: generateAccessToken,
  verifyAccessToken: verifyAccessToken,
  decodeAccessToken: decodeAccessToken
}
