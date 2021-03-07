const jwt = require('../helpers/jwt')
const User = require('../routes/Users')

const SignIn = async (req, res) => {
  const email = req.body.email

  await jwt.generateAccessToken({email: email}, res)
    .then((token) => {
      res.json({
        accessToken: `Bearer ${token}`
      })
    })
};

const SignUp = async (req, res) => {
  const email = req.body.email

  await jwt.generateAccessToken({email: email}, res)
    .then((token) => {
      req.accessToken = token
    })
  User.createUser(req, res)
}

module.exports = {

  SignIn: SignIn,
  SignUp: SignUp

}
