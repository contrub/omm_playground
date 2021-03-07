const User = require('../models/User')
const isEmpty = require('validator/lib/isEmpty')
const jwt = require('./jwt')
const bcrypt = require('bcrypt')

const isUserExist = (req, res, next) => {
  const email = req.body.email
  console.log(email)
  if (email === undefined || isEmpty(email)) res.status(200).json({message: 'Email undefined'})

  User
    .find({email: email})
    .then((user) => {
        if (user[0]) {
          res.status(200).json({message: 'User already exist!'})
        } else {
          next()
        }
      })

    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

const isUserDataExist = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined || isEmpty(email)) res.status(200).json({message: 'Email undefined'})

  else if (password === undefined || isEmpty(password)) res.status(200).json({message: 'Password undefined'})

  else {
    User
      .find({email: email})
      .then((item) => {
        if (item.length) {
          let savedPassword = item[0].password
          const matches = bcrypt.compareSync(password, savedPassword)
          if (matches) next()
          else res.status(200).json({message: 'Password error'})
        }
        else {
          res.status(200).json({message: 'User not found'})
        }
      })
      .catch(err => {
        res.sendStatus(500)
        console.log(err)
      })
  }
}

const getRole = (req, res) => {
  if (req.headers['authorization'] === undefined || isEmpty(req.headers['authorization'])) {

    res.status(200).json({userRole: 'guest'})

  } else {
    jwt.decodeAccessToken(req, res)
    if (req.decoded === undefined) {
      res.status(200).json({userRole: 'guest'})
    } else {
      User
        .find({email: req.decoded.email})
        .then(user => {
          res.status(200).json({userRole: user[0].userRole})
        })
    }
  }
}


module.exports = {

  isUserExist: isUserExist,
  isUserDataExist: isUserDataExist,
  getRole: getRole

}

