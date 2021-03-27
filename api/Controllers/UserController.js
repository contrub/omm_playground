// Local functions
const User = require('../routes/Users')
const jwt = require('../helpers/jwt')

const SignIn = async (req, res) => {
  const email = req.body.email

  if (req.isUserDataExist && req.status === 'active') {
    await jwt.generateAccessToken(req, res, {email: email})

    if (!res.headersSent) {
      res.json({accessToken: `Bearer ${req.accessToken}`})
    }
  } else if (req.status === 'disable') {
    res.status(200).json({message: "User temporary disabled"})
  } else {
    res.status(200).json({message: "Login payload incorrect"})
  }
};

const SignUp = async (req, res, next) => {
  const email = req.body.email

  if (!req.isUserExist) {
    await jwt.generateAccessToken(req, res, {email: email})

    if (!res.headersSent) {
      User.createUser(req, res)
    }
  } else {
    res.status(401).json({message: 'User already exist'})
  }
}

module.exports = {
  SignIn: SignIn,
  SignUp: SignUp
}
