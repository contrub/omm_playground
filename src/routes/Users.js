// Local schema
const User = require('../models/User')

// Third party functions
const bcrypt = require('bcrypt')

// Local class
const ApiError = require('../error/ApiError')

const getUsers = (req, res) => {
  User.find()
    .then(users => {
      let filteredItems = []

      for (let i = 0; i < users.length; i++) {
        filteredItems.push({
          _id: users[i]._id,
          email: users[i].email,
          userRole: users[i].userRole,
          status: users[i].status
        })
      }

      res.json(filteredItems)
    })
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    });
}

const getUser = (req, res) => {
  User
    .find({email: req.params.email})
    .then((user) => {
      let filteredItem = []

      filteredItem.push({
        _id: user[0]._id,
        email: user[0].email,
        userRole: user[0].userRole,
        status: user[0].status
      })
      
      res.json(filteredItem)
    })
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    });
}

const createUser = (req, res) => {
  const email = req.body.email
  let password = req.body.password

  const hash = bcrypt.hashSync(password, 12)

  const newUser = new User({
    email: email,
    password: hash
  })

  newUser
    .save()
    .then((user) => {
      res.send({
        data: {
          email: user.email,
          userRole: user.userRole,
          id: user._id
        },
        accessToken: req.accessToken
      })})
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    })
}

const updateUser = (req, res) => {
  let email = req.params.email
  let password = req.body.password

  if (password !== undefined) {
    req.body.password = bcrypt.hashSync(password, 12)
  }

  let newData = req.body

  User
    .updateOne({email: email}, newData)
    .then((user) => res.json(user))
    .catch(err => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    })
}

const deleteUser = (req, res) => {
  let email = req.params.email

  User
    .deleteOne({ email: email })
    .then(() => res.sendStatus(204))
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    })
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
