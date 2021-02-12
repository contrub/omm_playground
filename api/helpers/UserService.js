const User = require('../models/User')
const isEmail = require('validator/lib/isEmail')
const isEmpty = require('validator/lib/isEmpty')
const superadmins = require('../Controllers/superadmin.json')
const bcrypt = require('bcrypt')

const isUserExist = (req, res, next) => {
  const email = req.body.email
  if (email === undefined || isEmpty(email)) {

    res.status(404).json({message: 'Email undefined'})

  } else {

    User
      .find({email: email})
      .then((item) => {
        if (item.length !== 0) res.status(404).json({message: 'User already exist'})
        else if (superadmins.some(admin => admin.email === email)) {
          res.status(404).json({message: 'User already exist'})
        } else {
          next()
        }
      })
      .catch(err => {
        res.sendStatus(500)
        console.log(err)
      });

  }
}

const isUserDataExist = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined || password === undefined) {

    res.status(404).json({message: 'Login payload undefined'})

  } else {
    User
      .find({email: email})
      .then((item) => {

        if (item.length) {

          let savedPassword = item[0].password
          const matches = bcrypt.compareSync(password, savedPassword)

          if (matches) next()

          else {

            res.status(423).json({message: 'Password error'})

          }

        } else if (superadmins.some(admin => admin.email === email)) {

          const savedPassword = superadmins.find(superadmin => superadmin.email === email).password
          const matches = bcrypt.compareSync(password, savedPassword)

          if (matches) next()

          else {

            res.status(423).json({message: 'Password error'})

          }

        } else {

          res.status(404).json({message: 'User not found'})

        }
      })
      .catch(err => {

        res.sendStatus(500)
        console.log(err)

      });
  }
}

const isEmailCompliance = (req, res, next) => {

  if (req.body.email === undefined) {

    res.status(404).json({message: 'Email undefined'})

  } else {

    const email = req.body.email

    if (isEmail(email)) {

      next()

    } else {

      res.status(422).json({message: 'Email validation error'})

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

    res.status(404).json({message: 'Password undefined'})

  } else {

    const password = req.body.password

    if (!minCharactersRegex.test(password)) {

      res.status(422).json({message: 'Minimum number of characters error'})

    } else if (!numberCheckRegex.test(password)) {

      res.status(422).json({message: 'Not found at least one digit'})

    } else if (!lowercaseCheckRegex.test(password)) {

      res.status(422).json({message: 'Not found at least one lowercase letter symbol'})

    } else if (!uppercaseCheckRegex.test(password)) {

      res.status(422).json({message: 'Not found at least one uppercase letter symbol'})

    } else if (!specialCheckRegex.test(password)) {

      res.status(422).json({message: 'Not found at least one special symbol'})

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

