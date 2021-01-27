const User = require('../models/User')
const crypto = require('crypto')
const isEmail = require('validator/lib/isEmail')
const isEmpty = require('validator/lib/isEmpty')

const isUserExist = (req, res, next) => {
  User
    .find({email: req.body.email})
    .then((item) => {
      if (item.length) {
        res.status(406).send('User already exist!')
      }
      else {
        // res.status(404).send('User not found')
        next()
      }
    })
}

const isEmailCompliance = (req, res, next) => {

  if (req.body.email === undefined) {

    res.status(404).send('Email undefined')

  } else {

    const email = req.body.email

    if (isEmpty(email)) {

      res.status(422).send('Email cannot be empty')

    } else if (isEmail(email)) {

      next()

    } else {

      res.status(422).send('Email validation error')

    }
  }
}

const isPasswordCompliance = (req, res, next) => {

  const minCharactersRegex = new RegExp("^(?=.{8,})")
  const numberCheckRegex = new RegExp("^(?=.*[0-9])")
  const lowercaseCheckRegex = new RegExp("^(?=.*[a-z])")
  const uppercaseCheckRegex = new RegExp("^(?=.*[A-Z])")
  const specialCheckRegex = new RegExp("^(?=.*[!@#%&])")

  if (req.body.password === undefined) {

    res.status(404).send('Password undefined')

  } else {

    const password = req.body.password

    if (!minCharactersRegex.test(password)) {

      res.status(422).send('Minimum number of characters error')

    } else if (!numberCheckRegex.test(password)) {

      res.status(422).send('Not found at least one digit')

    } else if (!lowercaseCheckRegex.test(password)) {

      res.status(422).send('Not found at least one lowercase letter symbol')

    } else if (!uppercaseCheckRegex.test(password)) {

      res.status(422).send('Not found at least one uppercase letter symbol')

    } else if (!specialCheckRegex.test(password)) {

      res.status(422).send('Not found at least one special symbol')

    } else {

      next()

    }
  }
}

const isUserDataExist = (req, res, next) => {
  User
    .find({email: req.body.email})
    .then((item) => {
      if (item.length) {
        let salt = item[0].hash
        let inputPassword = crypto.createHash('sha256').update(salt + req.body.password + salt).digest('hex')
        let savedPassword = item[0].password
        if (inputPassword === savedPassword) {
          // res.status(200).send('User exist')
          next()
        } else {
          res.status(423).send({errors: 'Password error'})
        }
      }
      else {
        res.status(404).send('User not found')
      }
    })
}

module.exports = {

  isUserExist: isUserExist,
  isUserDataExist: isUserDataExist,
  isEmailCompliance: isEmailCompliance,
  isPasswordCompliance: isPasswordCompliance

}

