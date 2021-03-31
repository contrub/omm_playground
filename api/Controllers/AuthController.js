// Local functions
const User = require('../models/User')
const ApiError = require('../error/ApiError')

const UserDB = (req, res, next) => {
  const email = req.body.email

  User
    .find({email: email})
    .then((user) => {
      if (!user.length) {
        next(ApiError.custom(401, 'Email undefined in DB'))
      } else {
        const userRole = user[0].userRole
        const userAccessGroup = process.env.USERS_DB_ACCESS_GROUP.split(',')

        userAccessGroup.forEach((entry, index) => {
          userAccessGroup[index] = entry.replace(/\W/g, '')
        })

        if (!userAccessGroup.includes(userRole)) {
          next(ApiError.custom(403, 'UsersDB access denied'))
        }
      }
    })
}

const MonumentsDB = async (req, res, next) => {
  const email = req.body.email

  User
    .find({email: email})
    .then(user => {
      if (!user.length) {
        next(ApiError.custom(401, 'Email undefined in DB'))
      } else {
        const userRole = user[0].userRole
        const userAccessGroup = process.env.MONUMENTS_DB_ACCESS_GROUP.split(',')
          userAccessGroup.forEach((entry, index) => {
            userAccessGroup[index] = entry.replace(/\W/g, '')
          })

        if (!userAccessGroup.includes(userRole)) {
          next(ApiError.custom(403, 'Monuments access denied'))
        }
      }
    })
}

module.exports = {
  UserDB: UserDB,
  MonumentsDB: MonumentsDB
}
