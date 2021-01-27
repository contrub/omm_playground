const jwt = require('jsonwebtoken')

generateAccessToken = (payload, res) => {
  try {
    const token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_LIFE || 3600
      })

    return {
      token: token,
      lifetime: process.env.TOKEN_LIFE || 3600
    }

  } catch (e) {

    return res.status(401).send('Unauthorised')

  }
}

generateRefreshToken = (payload, res) => {
  try {
    const token = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_LIFE || 3600
      })

    return {
      token: token,
      lifetime: process.env.TOKEN_LIFE || 3600
    }

  } catch (e) {

    return res.status(401).send('Unauthorised')

  }
}

verifyAccessToken = (req, res, next) => {

  if (req.headers['authorization'] === undefined) {

    res.status(401).send('Unauthorised')

  } else {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).send('Unauthorised');
      if (decoded) {

        next()

      }
    })

  }
}

verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.token;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Unauthorised');
    if (decoded) {

      next()

    }
  });

  // релизовать тоже самое с refreshToken
}

module.exports = {

  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken,
  verifyAccessToken: verifyAccessToken,
  verifyRefreshToken: verifyRefreshToken

}
