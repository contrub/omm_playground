const isEmpty = require('validator/lib/isEmpty')

const jwt = require('../helpers/jwt')
const User = require('../models/User')

const UserDB = (req, res, next) => {
  jwt.decodeAccessToken(req, res)
  // Подобные функции могут вызвать ошибку связаную с тем, что на клиент уже был отправлен response об ошибке

  const email = req.decoded.email

  if (email === undefined || isEmpty(email)) res.status(404).json({message: "Email undefined in JWT"})

  User
    .find({email: email})
    .then((user) => {
      const userRole = user[0].userRole
      const userAccessGroup = process.env.USERS_DB_ACCESS_GROUP.split(',')
        userAccessGroup.forEach((entry, index) => {
          userAccessGroup[index] = entry.replace(/\W/g, '')
        })

      if (userAccessGroup.includes(userRole)) {
        next()
      } else {
        res.status(403).json({message: "UsersDB access denied"})
      }
    })
}

const MonumentsDB = async (req, res, next) => {
  await jwt.decodeAccessToken(req, res)
  // Подобные функции могут вызвать ошибку связаную с тем, что на клиент уже был отправлен response об ошибке

  const email = req.decoded.email

  if (email === undefined || isEmpty(email)) {
    res.status(404).json({message: "Email undefined in JWT"})
  } else {
    User
      .find({email: email})
      .then(user => {
        const userRole = user[0].userRole
        const userAccessGroup = process.env.MONUMENTS_DB_ACCESS_GROUP.split(',')

        userAccessGroup.forEach((entry, index) => {
          userAccessGroup[index] = entry.replace(/\W/g, '')
        })

        if (userAccessGroup.includes(userRole)) {
          next()
        } else {
          res.status(403).json({message: "MonumentsDB access denied"})
        }
      })
  }
}

module.exports = {

  UserDB: UserDB,
  MonumentsDB: MonumentsDB

}
