// Local schema 
const User = require('../models/User')

// Local class
const ApiError = require('../error/ApiError')

// Local resources
const permissions = require('../resources/permissions')

const verifyAction = async (req, action) => {
  const email = req.decoded ? req.decoded.email :  ''

  await User
    .find({email: email})
    .then((user) => {
      const userRole = user.length ? user[0].userRole : 'guest'
      const currentPermissions = Object.values(permissions)[Object.keys(permissions).indexOf(userRole)]

      if (!currentPermissions.includes(action)) {
        throw ApiError.custom(403, 'Access denied')
      }
    })
    .catch((err) => {
      // console.log(err)
      throw ApiError.internal('MongoDB error')
    })
}

module.exports = {
  verifyAction: verifyAction
}
