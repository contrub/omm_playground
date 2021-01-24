const verifyToken = require('../utils/verifyToken')
const jwt = require('../utils/jwt')

const login = (req, res, next) => {
  const refreshToken = req.body.token;

  console.log(refreshToken === null)

  if (refreshToken === null) {
    // В дальнейшем напишем кастомный обработчик ошибок в который можно передавать статус ошибки и читаемое сообщение
    return res.status(401).send('Unauthorised');
  }

  verifyToken.AccessToken(req, res)

  next()
};

const getTokens = (req, res, next) => {
  let tokens = jwt.generateTokens({email: req.body.email}, res)
  if (tokens.accessToken && tokens.refreshToken) {
    res.json({
      accessToken: `Bearer ${tokens.accessToken}`,
      refreshToken: `Bearer ${tokens.refreshToken}`,
      success: true
    })

    next()
  }
}

module.exports = {

  login: login,
  getTokens: getTokens

}
