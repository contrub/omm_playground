// Third party functions
const jwt = require('jsonwebtoken')

generateAccessToken = (req, res, payload) => {
  try {
    const token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET
    )

    req.accessToken = token
  } catch (err) {
    res.status(403).json({message: 'AccessToken generate error'})
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
        console.log(err)
        res.status(403).json({message: 'AccessToken decode error'})
      } else if (decoded) {
        req.decoded = decoded
        next()
      }
    })
  }
}

verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  
  if (authHeader === undefined) {
    res.status(401).json({message: 'AccessToken undefined'})
  } else {
    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({message: 'AccessToken validation error'})
        console.log(err)
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
