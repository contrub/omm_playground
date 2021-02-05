const User = require('../models/User')
const bcrypt = require('bcrypt')
const isEmail = require('validator/lib/isEmail')

const isUserExist = (req, res, next) => {
  const email = req.body.email
  if (email === undefined) {
    res.status(404).send('Email undefined')
  }

  User
    .find({email: req.body.email})
    .then((item) => {
      if (item.length) {
        res.status(409).send('User already exist!')
      }
      else {
        // res.status(404).send('User not found')
        next()
      }
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const isUserDataExist = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined || password === undefined) {
    res.status(404).send('Login info undefined')
  }

  User
    .find({email: email})
    .then((item) => {
      if (item.length) {
        let savedPassword = item[0].password
        bcrypt.compare(password, savedPassword, function (err, matches) {
          if (err) res.status(500).send('Comparing passwords error')
          if (matches) {
            next()
          } else {
            res.status(423).send('Password error')
          }
        })
      }
      else {
        res.status(404).send('User not found')
      }
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const isEmailCompliance = (req, res, next) => {

  if (req.body.email === undefined) {

    res.status(404).send('Email undefined')

  } else {

    const email = req.body.email

    if (isEmail(email)) {

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

module.exports = {

  isUserExist: isUserExist,
  isUserDataExist: isUserDataExist,
  isEmailCompliance: isEmailCompliance,
  isPasswordCompliance: isPasswordCompliance

}

