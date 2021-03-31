// Third party functions
const bcrypt = require('bcrypt')

// Local functions
const ApiError = require('../error/ApiError')
const User = require('../models/User')

const isUserExist = async (req, res, next) => {
  const email = req.body.email

  if (email === undefined) {
    next(ApiError.custom(403, 'Email undefined'))
  } else {
    await User
      .find({email: email})
      .then((user) => {
        req.isUserExist = user[0] === undefined ? false : true
      })
      .catch((err) => {
        console.log(err)
        next(ApiError.internal(500, 'MongoDB error'))
      })
  }
}

const isUserDataExist = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined) {
    res.send({message: "Email undefined"})
  } else if (password === undefined) {
    res.send({message: "Password undefined"})
  } else {
    await User
      .find({email: req.body.email})
      .then((item) => {
        if (item.length) {
          const savedPassword = item[0].password
          const matches = bcrypt.compareSync(password, savedPassword)

          matches ? req.isUserDataExist = true : req.isUserDataExist = false
        } else {
          req.isUserDataExist = false
        }
      })
      .catch((err) => {
        console.log(err)
        next(ApiError.internal('MongoDB error'))
      })
  }
}

const isUserActive = async (req, res, next) => {
  const email = req.body.email

  if (email === undefined) {
    next(ApiError.custom(403, 'Email undefined'))
  } else {
    await User
      .find({email: email})
      .then((user) => {
        if (user[0]) {
          req.isUserActive = user[0].status === 'active' ? true : false
        } else {
          next(ApiError.custom(403, 'User undefined'))
        }
      })
      .catch((err) => {
        console.log(err)
        next(ApiError.internal( 'MongoDB error'))
      })
  }
}

module.exports = {
  isUserDataExist: isUserDataExist,
  isUserActive: isUserActive,
  isUserExist: isUserExist
}

