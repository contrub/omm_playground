const verifyToken = require('../utils/verifyToken')

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

module.exports = {

  login: login

}
