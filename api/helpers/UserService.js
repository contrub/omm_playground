const User = require('../models/User')
const isEmail = require('validator/lib/isEmail')
const isEmpty = require('validator/lib/isEmpty')
const bcrypt = require('bcrypt')

const isUserExist = (req, res, next) => {
  const email = req.body.email
  if (email === undefined || isEmpty(email)) res.status(404).json({message: 'Email undefined'})
  else {
    User
      .find({email: email})
      .then((item) => {
        if (item.length) res.status(409).json({message: 'User already exist'})
        else next()
      })
      .catch(err => {
        res.sendStatus(500)
        console.log(err)
      })
  }
}

const isUserDataExist = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined || isEmpty(email)) res.status(404).json({message: 'Email undefined'})

  else if (password === undefined || isEmpty(password)) res.status(404).json({message: 'Password undefined'})

  else {
    User
      .find({email: email})
      .then((item) => {
        if (item.length) {
          let savedPassword = item[0].password
          const matches = bcrypt.compareSync(password, savedPassword)
          if (matches) next()
          else res.status(404).json({message: 'Password error'})
        }
        else res.status(404).json({message: 'User not found'})
      })
      .catch(err => {
        res.sendStatus(500)
        console.log(err)
      })
  }
}

const isEmailCompliance = (req, res, next) => {
  const email = req.body.email

  if (email === undefined || isEmpty(req.body.email)) {
    res.status(404).json({message: 'Email undefined'})
  } else {
    if (isEmail(email)) next()
    else res.status(404).json({message: 'Email validation error'})
  }
}

const isPasswordCompliance = (req, res, next) => {

  const minCharactersRegex = new RegExp("^(?=.{8,})")
  const numberCheckRegex = new RegExp("^(?=.*[0-9])")
  const lowercaseCheckRegex = new RegExp("^(?=.*[a-z])")
  const uppercaseCheckRegex = new RegExp("^(?=.*[A-Z])")
  const specialCheckRegex = new RegExp("^(?=.*[!@#%&])")

  if (req.body.password === undefined || isEmpty(req.body.password)) {

    res.status(404).json({message: 'Password undefined'})

  } else {

    const password = req.body.password

    if (!minCharactersRegex.test(password)) {

      res.status(404).json({message: 'Minimum number of characters error'})

    } else if (!numberCheckRegex.test(password)) {

      res.status(404).json({message: 'Not found at least one digit'})

    } else if (!lowercaseCheckRegex.test(password)) {

      res.status(404).json({message: 'Not found at least one lowercase letter symbol'})

    } else if (!uppercaseCheckRegex.test(password)) {

      res.status(404).json({message: 'Not found at least one uppercase letter symbol'})

    } else if (!specialCheckRegex.test(password)) {

      res.status(404).json({message: 'Not found at least one special symbol'})

    } else {

      next()

    }
  }
}

module.exports = {

  isUserExist: isUserExist,
  isUserDataExist: isUserDataExist,
  isEmailCompliance: isEmailCompliance,
  isPasswordCompliance: isPasswordCompliance

}

