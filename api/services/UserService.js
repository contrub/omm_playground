const User = require('../models/User')
const nodemailer = require('nodemailer');
const password = require('secure-random-password')
const Users = require('../routes/Users')

const getRole = (req, res) => {
  if (req.decoded.email === undefined) {
    res.status(200).json({userRole: 'viewer'})
  } else {
    User
      .find({email: req.decoded.email})
      .then((user) => {
        res.status(200).json({userRole: user[0].userRole})
      })
      .catch((e) => {
        // Точно ли стоит при ошибке отправлять 200 запрос с ролью 'viewer' ?
        // Если всё же 500 статус лучше, как в response передать роль 'viewer' ?
        console.log(e)
        res.status(200).json({userRole: 'viewer'})
      })
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

    if (!res.headersSent) {
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

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
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
}

module.exports = {
  getRole: getRole,
  resetPassword: resetPassword
}

