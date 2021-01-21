const jwt = require('jsonwebtoken')
const generateToken = require('./generateToken')

AccessToken = (req, res, next) => {
  const accessToken = req.body.token;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Unauthorised');
    if (decoded) {
      generateToken.AccessToken({ name: decoded.name })

      next()
    }
  });
}

RefreshToken = (req, res, next) => {
  const refreshToken = req.body.token;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Unauthorised');
    if (decoded) {
      generateToken.RefreshToken({ name: decoded.name })

      next()
    }
  });
}

module.exports = {

  AccessToken: AccessToken,
  RefreshToken: RefreshToken

}
