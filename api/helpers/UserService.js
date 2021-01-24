const User = require('../models/User')
const crypto = require('crypto')

const isUserExist = (req, res, next) => {
  console.log(req.body.email)
  User
    .find({email: req.body.email})
    .then((item) => {
      console.log(item)
      if (item.length) {
        res.status(200).send('User already exist!')
      }
      else {
        // res.status(404).send('User not found')
        next()
      }
    })
}

const isUserDataExist = (req, res, next) => {
  User
    .find({email: req.body.email})
    .then((item) => {
      if (item.length) {
        let salt = item[0].hash
        let inputPassword = crypto.createHash('sha256').update(salt + req.body.password + salt).digest('hex')
        let savedPassword = item[0].password
        if (inputPassword === savedPassword) {
          // res.status(200).send('User exist')
          next()
        } else {
          res.status(423).send('Password error')
        }
      }
      else {
        res.status(404).send('User not found')
      }
    })
}

module.exports = {

  isUserExist: isUserExist,
  isUserDataExist: isUserDataExist

}

