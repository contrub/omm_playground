const jwt = require('../helpers/jwt')
const User = require('../routes/Users')

const SignIn = async (req, res) => {
  const email = req.body.email

  if (req.isUserDataExist && req.status === 'active') {
    await jwt.generateAccessToken({email: email}, res)
      .then((token) => {
        res.json({
          accessToken: `Bearer ${token}`
        })
      })
  } else if (req.status === 'disable') {
    res.status(200).send({message: "User temporary disabled"})
  } else {
    res.status(200).send({message: "User with this email doesn't exist"})
  }
};

const SignUp = async (req, res) => {
  const email = req.body.email

  if (!req.isUserExist) {
    await jwt.generateAccessToken({email: email}, res)
      .then((token) => {
        req.accessToken = token
      })
    User.createUser(req, res)
  } else {
    res.status(200).send({message: "User with this email already exist"})
  }
}

module.exports = {

  SignIn: SignIn,
  SignUp: SignUp

}
