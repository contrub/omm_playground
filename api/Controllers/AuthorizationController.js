// Local functions
const User = require('../models/User')

const UserDB = (req, res, next) => {
  if (req.decoded.email === undefined) {
    res.status(403).json({message: 'Email undefined in JWT'})
  } else {
    const email = req.decoded.email

    User
      .find({email: email})
      .then((user) => {
        if (!user.length) {
          res.status(401).json({message: 'Email undefined in DB'})
        } else {
          const userRole = user[0].userRole
          const userAccessGroup = process.env.USERS_DB_ACCESS_GROUP.split(',')

          userAccessGroup.forEach((entry, index) => {
            userAccessGroup[index] = entry.replace(/\W/g, '')
          })

          if (userAccessGroup.includes(userRole)) {
            next()
          } else {
            res.status(403).json({message: 'UsersDB access denied'})
          }
        }
      })
  }
}

const MonumentsDB = async (req, res, next) => {
  if (req.decoded.email === undefined) {
    res.status(403).json({message: 'Email undefined in JWT'})
  } else {
    const email = req.decoded.email

    User
      .find({email: email})
      .then(user => {
        if (!user.length) {
          res.status(401).json({message: 'Email undefined in DB'})
        } else {
          const userRole = user[0].userRole
          const userAccessGroup = process.env.MONUMENTS_DB_ACCESS_GROUP.split(',')

          userAccessGroup.forEach((entry, index) => {
            userAccessGroup[index] = entry.replace(/\W/g, '')
          })

          if (userAccessGroup.includes(userRole)) {
            next()
          } else {
            res.status(403).json({message: 'MonumentsDB access denied'})
          }
        }
      })
  }
}

module.exports = {
  UserDB: UserDB,
  MonumentsDB: MonumentsDB
}
