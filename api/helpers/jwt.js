const jwt = require('jsonwebtoken')
const isEmpty = require("validator/lib/isEmpty");

generateAccessToken = async (payload, res, next) => {
  try {
    const token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET
    )
    return token
  } catch (err) {
    console.log(err)
    res.sendStatus(401)
  }
}

decodeAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (authHeader === undefined || isEmpty(authHeader)) {
    res.status(401).json({message: 'AccessToken undefined'})
  } else {
    const accessToken = req.headers.authorization.split(' ')[1]
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        res.sendStatus(403)
      } else if (decoded) {
        req.decoded = decoded
        next()
      }
    })
  }
}

verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (authHeader === undefined || isEmpty(authHeader)) {
    res.sendStatus(401)
  } else {
    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        res.sendStatus(403)
      } else if (decoded) {
        next()
      }
    })

  }
}

module.exports = {

  generateAccessToken: generateAccessToken,
  verifyAccessToken: verifyAccessToken,
  decodeAccessToken: decodeAccessToken

}
