const jwt = require('../utils/jwt')

const verifyUser = (req, res, next) => {

  jwt.verifyAccessToken(req, res, next)

}

module.exports = {

  verifyUser: verifyUser

}
