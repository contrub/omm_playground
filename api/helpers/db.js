const bcrypt = require('bcrypt')
const isEmpty = require('validator/lib/isEmpty')
const isEmail = require('validator/lib/isEmail')

const isUserExist = (req, res, next) => {
  const email = req.decoded.email

  if (email === undefined || isEmpty(email)) {
    res.sendStatus(404)
  } else {
    User
      .find({email: email})
      .then((user) => {
        if (user[0]) {
          req.isUserExist = true
          next()
        } else {
          req.isUserExist = false
          next()
        }
      })
      .catch((err) => {
        res.sendStatus(500)
        console.log(err)
      })
  }
}

const isUserDataExist = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined || isEmpty(email)) {
    res.status(200).json({message: "Email undefined"})
  } else if (password === undefined || isEmpty(password)) {
    res.status(200).json({message: "Password undefined"})
  } else {
    User
      .find({email: req.body.email})
      .then((item) => {
        if (item.length) {
          const savedPassword = item[0].password
          const matches = bcrypt.compareSync(password, savedPassword)

          req.status = item[0].status

          if (matches) {
            req.isUserDataExist = true
            next()
          } else {
            req.isUserDataExist = false
            next()
          }
        }
        else {
          req.isUserDataExist = false
          next()
        }
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  }
}

module.exports = {
  isUserExist: isUserExist,
  isUserDataExist: isUserDataExist
}
