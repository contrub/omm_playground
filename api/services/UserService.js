const User = require('../models/User')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const getRole = (req, res) => {
  const authHeader = req.headers['authorization']

  if (authHeader === undefined) {
    res.status(200).json({userRole: 'viewer'})
  } else {
    const accessToken = req.headers.authorization.split(' ')[1]

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        res.status(200).json({userRole: 'viewer'})
      } else if (decoded) {
        User
          .find({email: decoded.email})
          .then((user) => {
            res.status(200).json({userRole: user[0].userRole === undefined ? 'viewer' : user[0].userRole})
          })
          .catch((err) => {
            res.status(200).json({userRole: 'viewer'})
            console.log(err)
          })
      }
    })
  }
}

const resetPassword = async (req, res) => {
  const email = req.body.email

  if (email !== undefined || req.isUserExist) {
    const token = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET)
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
      });

      let mailOptions = {
        from: `"OMM" <${process.env.SMTP_EMAIL}>`,
        to: `${email}`,
        subject: 'OMM - Password Reset Instructions',
        text: 'Password Reset',
        html: output
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).json({message: `${process.env.TRANSPORTER_SERVICE} error`})
          console.log(err)
        } else {
          // console.log('Message sent: %s', info.messageId)
          res.sendStatus(200)
        }
      })
  } else {
    res.status(200).json({message: "User undefined"})
  }
}

const updatePassword = (req, res, next) => {
  if (req.decoded.email !== undefined) {
    req.params.email = req.decoded.email

    next()
  } else {
    res.status(401).json({message: 'Email undefined in JWT'})
  }
}

module.exports = {
  getRole: getRole,
  resetPassword: resetPassword,
  updatePassword: updatePassword
}

