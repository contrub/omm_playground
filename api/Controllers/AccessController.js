const jwt = require('jsonwebtoken')
const User = require('../models/User')
const isEmpty = require('validator/lib/isEmpty')
const superadmins = require('./superadmin.json')

const isFullAccess = (payload) => {
  const result = superadmins.some(admin => admin.email === payload.email)

  return result
}

const UsersDB = (req, res, next) => {
  const token = req.headers['authorization']

  if (token === undefined || isEmpty(token)) res.status(404).send('AccessToken undefined')

  else {
    const accessToken = req.headers.authorization.split(' ')[1]

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).send('Unauthorised');
      if (decoded) {
        if (isFullAccess(decoded)) {
          next()
        } else {
          User
            .find({email: decoded.email})
            .then((item) => {
              const userRole = item[0].userType
              if (process.env.USERS_DB_ACCESS_GROUP.includes(userRole)) {
                next()
              } else {
                res.status(403).json({message: "Access denied"})
              }
            })
            .catch(err => {
              res.sendStatus(500)
              console.log(err)
            })
        }
      }
    })
  }
}

const MonumentsDB = (req, res, next) => {
  const token = req.headers['authorization']

  if (token === undefined) res.status(401).send('Unauthorised')

  else {
    const accessToken = req.headers.authorization.split(' ')[1]

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).send('Unauthorised');
      if (decoded) {
        if (isFullAccess(decoded)) {
          next()
        } else {
          User
            .find({email: decoded.email})
            .then((item) => {
              const userRole = item[0].userType
              if (process.env.MONUMENTS_DB_ACCESS_GROUP.includes(userRole)) {
                next()
              } else {
                res.status(404).json({message: "Access denied"})
              }
            })
            .catch(err => {
              res.sendStatus(500)
              console.log(err)
            })
        }
      }
    })
  }
}

module.exports = {

  UsersDB: UsersDB,
  MonumentsDB: MonumentsDB

}
