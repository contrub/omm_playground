const User = require('../models/User')
const createError = require('http-errors')

const UserDB = (req, res, next) => {
  if (req.decoded === undefined) {
    res.sendStatus(403)
  } else {
    const email = req.decoded.email

    User
      .find({email: email})
      .then((user) => {
        if (!user.length) {
          res.sendStatus(401)
        } else {
          const userRole = user[0].userRole
          const userAccessGroup = process.env.USERS_DB_ACCESS_GROUP.split(',')
          userAccessGroup.forEach((entry, index) => {
            userAccessGroup[index] = entry.replace(/\W/g, '')
          })

          if (userAccessGroup.includes(userRole)) {
            next()
          } else {
            next(new createError(403, "UsersDB access denied"))
          }
        }
      })
  }
}

const MonumentsDB = async (req, res, next) => {
  if (req.decoded === undefined) {
    res.sendStatus(403)
  } else {
    const email = req.decoded.email

    User
      .find({email: email})
      .then(user => {
        if (!user.length) {
          res.sendStatus(401)
        } else {
          const userRole = user[0].userRole
          const userAccessGroup = process.env.MONUMENTS_DB_ACCESS_GROUP.split(',')

          userAccessGroup.forEach((entry, index) => {
            userAccessGroup[index] = entry.replace(/\W/g, '')
          })

          if (userAccessGroup.includes(userRole)) {
            next()
          } else {
            res.sendStatus(403)
          }
        }
      })
  }
}

module.exports = {
  UserDB: UserDB,
  MonumentsDB: MonumentsDB
}
