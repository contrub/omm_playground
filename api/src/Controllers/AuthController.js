// Local schema 
const User = require('../models/User')

// Local class
const ApiError = require('../error/ApiError')

// Local resources
const permissions = require('../resources/permissions')

// const UserDB = (req, res, next) => {
//   const email = req.decoded.email
//
//   User
//     .find({email: email})
//     .then((user) => {
//       if (!user.length) {
//         next(ApiError.custom(401, 'Email undefined in DB'))
//       } else {
//         const userRole = user[0].userRole
//         const userAccessGroup = process.env.USERS_DB_ACCESS_GROUP.split(',')
//
//         userAccessGroup.forEach((entry, index) => {
//           userAccessGroup[index] = entry.replace(/\W/g, '')
//         })
//
//         if (!userAccessGroup.includes(userRole)) {
//           next(ApiError.custom(403, 'UsersDB access denied'))
//         }
//       }
//     })
// }

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

// const MonumentsDB = async (req, res, next) => {
//   const email = req.decoded.email
//
//   User
//     .find({email: email})
//     .then(user => {
//       if (!user.length) {
//         next(ApiError.custom(401, 'Email undefined in DB'))
//       } else {
//         const userRole = user[0].userRole
//         const userAccessGroup = process.env.MONUMENTS_DB_ACCESS_GROUP.split(',')
//           userAccessGroup.forEach((entry, index) => {
//             userAccessGroup[index] = entry.replace(/\W/g, '')
//           })
//
//         if (!userAccessGroup.includes(userRole)) {
//           next(ApiError.custom(403, 'Monuments access denied'))
//         }
//       }
//     })
// }

module.exports = {
  // UserDB: UserDB,
  // MonumentsDB: MonumentsDB,
  verifyAction: verifyAction
}
