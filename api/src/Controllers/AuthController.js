// Local schema 
const User = require('../models/User')

// Local class
const ApiError = require('../error/ApiError')

// Local resources
const permissions = require('../resources/permissions')

const verifyAction = (req, action, res, next) => {
  const email = req.decoded ? req.decoded.email :  ''

  User
    .find({email: email})
    .then((user) => {
      const userRole = user.length ? user[0].userRole : 'guest'
      const currentPermissions = Object.values(permissions)[Object.keys(permissions).indexOf(userRole)]

      console.log(action)
      console.log(currentPermissions)
      console.log(currentPermissions.includes(action))

      if (!currentPermissions.includes(action)) {
        next(ApiError.custom(403, 'Access denied'))
      }
    })
}

module.exports = {
  verifyAction: verifyAction
}
