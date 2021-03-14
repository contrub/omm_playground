const jwt = require('jsonwebtoken')

generateAccessToken = async (payload, res) => {
  try {
    const token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET
    )
    return token
  } catch (err) {
    return res.status(401).json({message: 'Unauthorised'})
  }
}

// generateRefreshToken = async (payload, res) => {
//   try {
//     const token = jwt.sign(
//       payload,
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         // expiresIn: process.env.TOKEN_LIFE || 3600
//       })
//
//     return token
//
//   } catch (err) {
//
//     return res.status(401).json({message: 'Unauthorised'})
//
//   }
// }

// generatePairTokens = async (req, res) => {
//   const accessToken = await generateAccessToken({email: req.body.email}, res)
//   const refreshToken = await generateRefreshToken({email: req.body.email}, res)
//
//   req.accessToken = `Bearer ${accessToken}`
//   req.refreshToken = `Bearer ${refreshToken}`
// }

decodeAccessToken = (req, res) => {

  if (req.headers['authorization'] === undefined) {

    res.status(401).send('Unauthorised')

  } else {

    const accessToken = req.headers.authorization.split(' ')[1]

    // появление ошибки тут полностью ломает функцию для получения роли пользователя
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({message: 'Unauthorised'})
      } else if (decoded) {
        req.decoded = decoded
      }
    })
  }
}

verifyAccessToken = (req, res, next) => {
  if (req.headers['authorization'] === undefined) {
    res.status(401).json({message: 'Unauthorised'})
  } else {
    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({message: 'Unauthorised'});
      if (decoded) next()
    })

  }
}

// verifyRefreshToken = (req, res, next) => {
//   const refreshToken = req.body.token;
//
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//     // if (err) return res.status(403).send('Unauthorised');
//     if (err) return res.status(403).json({message: err.name});
//     if (decoded) {
//
//       next()
//
//     }
//   });
//
// }

module.exports = {

  generateAccessToken: generateAccessToken,
  // generateRefreshToken: generateRefreshToken,
  // generatePairTokens: generatePairTokens,
  verifyAccessToken: verifyAccessToken,
  // verifyRefreshToken: verifyRefreshToken,
  decodeAccessToken: decodeAccessToken

}
