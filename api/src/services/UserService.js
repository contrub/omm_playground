// Local modules
const User = require('../models/User')

// Local class
const ApiError = require('../error/ApiError')

// Third party modules
const bcrypt = require('bcrypt')

const isUserExist = async (req) => {
  const email = req.body.email

  if (email === undefined) {
    throw ApiError.custom(403, "Email not found")
  } else {
    await User
      .find({email: email})
      .then((user) => {
        req.isUserExist = user[0] === undefined ? false : true
      })
      .catch((err) => {
        // console.log(err)
        throw ApiError.internal(500, "MongoDB error")
      })
  }
}

const isUserDataExist = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined) {
    throw ApiError.custom(401, "Email not found")
  } else if (password === undefined) {
    throw ApiError.custom(401, "Password not found")
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
        throw ApiError.internal("MongoDB error")
      })
  }
}

const isUserActive = async (req, res) => {
  const email = req.body.email

  if (email === undefined) {
    throw ApiError.custom(403, "Email undefined")
  } else {
    await User
      .find({email: email})
      .then((user) => {
        if (user[0]) {
          req.isUserActive = user[0].status === 'active' ? true : false
        } else {
          throw ApiError.custom(403, "User not found")
        }
      })
      .catch((err) => {
        if (err instanceof ApiError) {
          throw ApiError.custom(err.statusCode, err.message)
        } else {
          throw ApiError.internal("MongoDB error")
        }
      })
  }
}

module.exports = {
  isUserDataExist: isUserDataExist,
  isUserActive: isUserActive,
  isUserExist: isUserExist
}

