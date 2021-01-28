const jwt = require('../utils/jwt')

const login = (req, res, next) => {
  getTokens(req, res, next)
    .then(() => {
      res.send({
        accessToken: req.accessToken,
        refreshToken: req.refreshToken,
        lifetime: req.lifetime,
        success: req.success,
      })
    })
  // const refreshToken = req.body.token;
  //
  // if (refreshToken === null) {
  //   // В дальнейшем напишем кастомный обработчик ошибок в который можно передавать статус ошибки и читаемое сообщение
  //   return res.status(401).send('Unauthorised');
  // }
  //
  // // verifyToken.AccessToken(req, res)
  //
  // next()
};

const getTokens = async (req, res, next) => {
  try {
    const accessTokenInfo = await jwt.generateAccessToken({email: req.body.email}, res)
    const accessToken = accessTokenInfo['token']
    const accessTokenLifetime = accessTokenInfo['lifetime']


    const refreshTokenInfo = await jwt.generateRefreshToken({email: req.body.email}, res)
    const refreshToken = refreshTokenInfo['token']
    const refreshTokenLifetime = refreshTokenInfo['lifetime']

    if (accessToken && refreshToken) {
      // стрим запроса, между обработчиками можно сохранять и пробрасывать данные
      req.accessToken = `Bearer ${accessToken}`;
      req.refreshToken = `Bearer ${refreshToken}`;
      req.lifetime = accessTokenLifetime;
      req.success = true

      next()
    }
  } catch (err) {

    next(err)

  }
}

module.exports = {

  login: login,
  getTokens: getTokens

}
