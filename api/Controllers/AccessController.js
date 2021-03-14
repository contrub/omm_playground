const jwt = require('../helpers/jwt')

const verifyUser = (req, res, next) => {
  // Возможно, есть смысл перенести сюда верификацию токена целиком, но зачем если у нас уже есть можуль функций jwt
  // Есть ли смысл в данной функции, если в цепочке мы можем просто применить jwt.verifyAccessToken
  jwt.verifyAccessToken(req, res, next)
}

module.exports = {
  verifyUser: verifyUser
}

