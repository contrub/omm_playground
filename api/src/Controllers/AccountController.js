// Local modules
const UserService = require('../services/UserService')
const validator = require('../helpers/validator')
const User = require('../models/User')
const Users = require('../routes/Users')
const jwt = require('../helpers/jwt')

// Local class
const ApiError = require('../error/ApiError')

// Third party modules
const nodemailer = require('nodemailer')

const signIn = async (req, res, next) => {
  try {
    const email = req.body.email

    await UserService.isUserExist(req)

    if (!req.isUserExist) {
      throw ApiError.custom(404, "Couldn't find user")
    }

    await UserService.isUserDataExist(req, res)

    if (!req.isUserDataExist) {
      throw ApiError.custom(401, "Incorrect password")
    }

    await UserService.isUserActive(req, res)

    if (!req.isUserActive) {
      throw ApiError.custom(403, "User temporary disabled")
    } else {
      await jwt.generateAccessToken(req, {email: email})

      res.send({accessToken: `Bearer ${req.accessToken}`})
    }
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const signUp = async (req, res, next) => {
  try {
    const email = req.body.email

    await UserService.isUserExist(req, res)
    await validator.isEmailCompliance(req, res)
    await validator.isPasswordCompliance(req, res)
    await jwt.generateAccessToken(req, {email: email})

    if (req.isUserExist) {
      throw ApiError.custom(401, "User already exists!")
    } else {
      Users.createUser(req, res)
    }
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

const userRole = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']

    if (authHeader === undefined) {
      res.send({userRole: 'guest'})
    } else {
      await jwt.verifyAccessToken(req, res)
      await jwt.decodeAccessToken(req, res)

      User
        .find({email: req.decoded.email})
        .then((user) => {
          res.send({userRole: user[0] === undefined ? 'guest' : user[0].userRole})
        })
        .catch((err) => {
          // console.log(err)
          throw ApiError.internal("MongoDB error")
        })
    }
  } catch (err) {
    // console.log(err)
    if (err instanceof ApiError) {
      throw ApiError.custom(err.statusCode, err.message)
    } else {
      throw ApiError.internal("MongoDB error")
    }
  }
}

const updatePasswordRequest = async (req, res, next) => {
  try {
    const email = req.body.email

    await UserService.isUserExist(req, res)

    console.log(req.isUserExist)

    if (!req.isUserExist) {
      throw ApiError.custom(401, "Couldn't find user")
    }

    await jwt.generateAccessToken(req, {email: email}, {expiresIn: '1s'})

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

    const transporterResult = await transporter.sendMail(mailOptions)

    if (!transporterResult instanceof Error) {
      throw ApiError.internal(`${process.env.TRANSPORTER_SERVICE} service error`)
    }

    res.status(200).send({message: `Check your email - ${email} (will expire in 10 minutes)`})

  } catch (err) {
    console.log(err)
    // console.log(err)
    next(err)
  }
}

const updatePassword = async (req, res, next) => {
  try {
    await jwt.verifyAccessToken(req, res, next)
    await jwt.decodeAccessToken(req, res, next)

    if (req.decoded.email === undefined) {
      throw ApiError.custom(404, "Couldn't find user")
    } else {
      req.params.email = req.decoded.email
      req.body.email = req.decoded.email
    }

    await UserService.isUserExist(req, res, next)
    await Users.updateUser(req, res)
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

module.exports = {
  SignIn: signIn,
  SignUp: signUp,
  UpdatePasswordRequest: updatePasswordRequest,
  UpdatePassword: updatePassword,
  UserRole: userRole
}
