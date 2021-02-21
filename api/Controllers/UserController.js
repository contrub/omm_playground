const jwt = require('../utils/jwt')
const User = require('../routes/Users')

const SignIn = (req, res) => {
  jwt.generatePairTokens(req, res)
    .then(() => {
      res.json({
        accessToken: req.accessToken,
        refreshToken: req.refreshToken
      })
    })
};

const SignUp = async (req, res) => {
  await jwt.generatePairTokens(req, res)

  User.createUser(req, res)
}


module.exports = {

  SignIn: SignIn,
  SignUp: SignUp

}
