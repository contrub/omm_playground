const jwt = require('../helpers/jwt')
const User = require('../routes/Users')
const createError = require('http-errors')

const SignIn = async (req, res) => {
  const email = req.body.email

  if (req.isUserDataExist && req.status === 'active') {
    await jwt.generateAccessToken({email: email}, res)
      .then((token) => {
          if (!res.headersSent) {
            res.json({accessToken: `Bearer ${token}`})
          }
      })
  } else if (req.status === 'disable') {
    res.status(200).json({message: "User temporary disabled"})
  } else {
    res.status(200).json({message: "User with this email doesn't exist"})
  }
};

const SignUp = async (req, res, next) => {
  const email = req.body.email

  if (!req.isUserExist) {
    await jwt.generateAccessToken({email: email}, res, next)
      .then((token) => {
        req.accessToken = token
      })
    if (!res.headersSent) {
      User.createUser(req, res)
    }
  } else {
    res.sendStatus(401)
  }
}

module.exports = {
  SignIn: SignIn,
  SignUp: SignUp
}
