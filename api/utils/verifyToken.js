const jwt = require('jsonwebtoken')

const AccessToken = (req, res, next) => {
  const accessToken = req.headers.access.split(' ')[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Unauthorised');
    if (decoded) {

      next()
    }
  })
}

const RefreshToken = (req, res, next) => {
  const refreshToken = req.body.token;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Unauthorised');
    if (decoded) {

      next()
    }
  });
}

module.exports = {

  AccessToken: AccessToken,
  RefreshToken: RefreshToken

}
