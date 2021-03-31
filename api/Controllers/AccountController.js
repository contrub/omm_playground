// Local functions
const UserService = require('../services/UserService')
const validator = require('../helpers/validator')
const User = require('../models/User')
const Users = require('../routes/Users')
const jwt = require('../helpers/jwt')
const nodemailer = require('nodemailer')
const ApiError = require('../error/ApiError')

const signIn = async (req, res, next) => {
  const email = req.body.email

  await UserService.isUserDataExist(req, res, next)
  await UserService.isUserActive(req, res, next)

  if (req.isUserDataExist && req.isUserActive) {
    await jwt.generateAccessToken(req, {email: email}, next)

    res.send({accessToken: `Bearer ${req.accessToken}`})
  } else if (!req.isUserActive) {
    res.send({message: "User temporary disabled"})
  } else {
    res.send({message: "Login payload incorrect"})
  }
}

const signUp = async (req, res, next) => {
  const email = req.body.email

  await UserService.isUserExist(req, res, next)
  await validator.isEmailCompliance(req, res)
  await validator.isPasswordCompliance(req, res)
  await jwt.generateAccessToken(req, {email: email}, next)

  if (req.isUserExist) {
    res.send({message: "User already exist!"})
  } else {
    Users.createUser(req, res)
  }
}

const userRole = async (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (authHeader === undefined) {
    res.send({userRole: 'viewer'})
  } else {
    await jwt.verifyAccessToken(req, res, next)
    await jwt.decodeAccessToken(req, res, next)

    User
      .find({email: req.decoded.email})
      .then((user) => {
        res.send({userRole: user[0].userRole === undefined ? 'viewer' : user[0].userRole})
      })
      .catch((err) => {
        res.send({userRole: 'viewer'})
        console.log(err)
      })
  }
}

const updatePasswordRequest = async (req, res, next) => {
  const email = req.body.email

  await UserService.isUserExist(req, res, next)
  await jwt.generateAccessToken(req, {email: email}, next, {expiresIn: '60s'})

  if (!req.isUserExist) {
    res.send({message: "User undefined"})
    return
  }

  const token = req.accessToken
  const output =
    `
        <p>
            A request to reset your password has been made (valid for 10 minutes). If you did not make this request, simply ignore this email. If you did make this request just click the link below:
        </p>
        <p>
            ${process.env.RESET_PASSWORD_TEMPLATE_LINK + token}
        </p>
        <p>
            If the above URL does not work, try copying and pasting it into your browser. If you continue to experience problems please feel free to contact us.
        </p>
    `
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  })

  let mailOptions = {
    from: `"OMM" <${process.env.SMTP_EMAIL}>`,
    to: `${email}`,
    subject: 'OMM - Password Reset Instructions',
    text: 'Password Reset',
    html: output
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      next(ApiError.internal(`${process.env.TRANSPORTER_SERVICE} error`))
      console.log(err)
    } else {
      // console.log('Message sent: %s', info.messageId)
      res.sendStatus(200)
    }
  })
}

const updatePassword = async (req, res, next) => {
  await jwt.verifyAccessToken(req, res, next)
  await jwt.decodeAccessToken(req, res, next)

  if (req.decoded.email === undefined) {
    res.send({message: "User undefined"})
    return
  } else {
    req.params.email = req.decoded.email
    req.body.email = req.decoded.email
  }

  await UserService.isUserExist(req, res, next)
  await Users.updateUser(req, res)
}

module.exports = {
  SignIn: signIn,
  SignUp: signUp,
  UpdatePasswordRequest: updatePasswordRequest,
  UpdatePassword: updatePassword,
  UserRole: userRole
}
