// Third party functions
const bcrypt = require('bcrypt')

const isUserExist = (req, res, next) => {
  const email = req.body.email

  if (email === undefined) {
    res.status(403).json({message: 'Email undefined'})
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
        console.log(err)
        res.status(500).json({message: 'MongoDB error'})
      })
  }
}

const isUserDataExist = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined) {
    res.status(200).json({message: "Email undefined"})
  } else if (password === undefined) {
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
        res.status(500).json({message: 'MongoDB error'})
      })
  }
}

module.exports = {
  isUserExist: isUserExist,
  isUserDataExist: isUserDataExist
}
