const User = require('../models/User')
const isEmpty = require('validator/lib/isEmpty')
const jwt = require('../helpers/jwt')
const nodemailer = require('nodemailer');
const password = require('secure-random-password')

const Users = require('../routes/Users')

// const isUserExist = (req, res, next) => {
//   const email = req.body.email
//   if (email === undefined || isEmpty(email)) res.status(200).json({message: 'Email undefined'})
//
//   else {
//     User
//       .find({email: email})
//       .then((user) => {
//         if (user[0]) {
//           res.status(200).json({message: 'User already exist!'})
//         } else {
//           next()
//         }
//       })
//
//       .catch(err => {
//         res.sendStatus(500)
//         console.log(err)
//       })
//   }
// }
//
// const isUserDataExist = (req, res, next) => {
//   const email = req.body.email
//   const password = req.body.password
//
//   if (email === undefined || isEmpty(email)) res.status(200).json({message: 'Email undefined'})
//
//   else if (password === undefined || isEmpty(password)) res.status(200).json({message: 'Password undefined'})
//
//   else {
//     User
//       .find({email: email})
//       .then((item) => {
//         if (item.length) {
//           let savedPassword = item[0].password
//           const matches = bcrypt.compareSync(password, savedPassword)
//           if (matches) next()
//           else res.status(200).json({message: 'Password error'})
//         }
//         else {
//           res.status(200).json({message: 'User not found'})
//         }
//       })
//       .catch(err => {
//         res.sendStatus(500)
//         console.log(err)
//       })
//   }
// }

const getRole = (req, res) => {
  if (req.headers['authorization'] === undefined || isEmpty(req.headers['authorization'])) {
    res.status(200).json({userRole: 'viewer'})
  } else {
    jwt.decodeAccessToken(req, res)
    if (req.decoded === undefined) {
      res.status(200).json({userRole: 'viewer'})
    } else {
      User
        .find({email: req.decoded.email})
        .then(user => {
          res.status(200).json({userRole: user[0].userRole})
        })
    }
  }
}

const resetPassword = async (req, res) => {
  const email = req.body.email

  if (req.isUserExist) {
    const newPassword = password.randomPassword({
      characters: ['1234567890', 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '!@#%&']
    })

    req.params.email = email
    req.body = {password: newPassword}

    await Users.updateUser(req, res)
    // Продумать случай, когда БД сразу отошлет ошибку на клент (крах сервера не вызывает, ошибки в логах)

    const output = `
      <h3>Your password has been changed</h3>
      <p>New data for authorization</p>
      <ul>
          <li><b>Email: </b>${email}</li>
          <li><b>Password: </b>${newPassword}</li>
      </ul>
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
      subject: 'OMM Password Change Request',
      text: 'Password Reset',
      html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.sendStatus(500)
      } else {
        // console.log('Message sent: %s', info.messageId)
        res.status(200).json({status: true, message: "Successful reset password"})
      }
    });
  } else {
    res.status(200).json({status: false, message: "User undefined"})
  }
}

module.exports = {
  getRole: getRole,
  resetPassword: resetPassword
}

