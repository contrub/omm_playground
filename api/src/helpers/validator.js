// Third party functions
const isEmail = require('validator/lib/isEmail')
const isEmpty = require('validator/lib/isEmpty')

const isEmailCompliance = (req, res) => {
  const email = req.body.email

  if (email === undefined || isEmpty(req.body.email)) {
    res.send({message: 'Email undefined'})
  } else {
    if (!isEmail(email)) {
      res.send({message: 'Email validation error'})
    }
  }
}

const isPasswordCompliance = (req, res) => {
  const minCharactersRegex = new RegExp("^(?=.{8,})")
  const numberCheckRegex = new RegExp("^(?=.*[0-9])")
  const lowercaseCheckRegex = new RegExp("^(?=.*[a-z])")
  const uppercaseCheckRegex = new RegExp("^(?=.*[A-Z])")
  const specialCheckRegex = new RegExp("^(?=.*[!@#%&])")

  if (req.body.password === undefined || isEmpty(req.body.password)) {
    res.send({message: 'Password undefined'})
  } else {
    const password = req.body.password

    if (!minCharactersRegex.test(password)) {
      res.send({message: 'Minimum number of characters error'})
    } else if (!numberCheckRegex.test(password)) {
      res.send({message: 'Not found at least one digit'})
    } else if (!lowercaseCheckRegex.test(password)) {
      res.send({message: 'Not found at least one lowercase letter symbol'})
    } else if (!uppercaseCheckRegex.test(password)) {
      res.send({message: 'Not found at least one uppercase letter symbol'})
    } else if (!specialCheckRegex.test(password)) {
      res.send({message: 'Not found at least one special symbol'})
    }
  }
}

module.exports = {
  isEmailCompliance: isEmailCompliance,
  isPasswordCompliance: isPasswordCompliance
}
