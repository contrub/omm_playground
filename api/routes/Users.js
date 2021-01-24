const User = require('../models/User');
const makeSalt = require('../utils/createSault')
const crypto = require('crypto')

const getUsers = (req, res) => {
  User.find()
    .then(items => {
      let filteredItems = []

      for (let i = 0; i < items.length; i++) {
        filteredItems.push({
          _id: items[i]._id,
          email: items[i].email,
          userType: items[i].userType
        })
      }

      res.json(filteredItems)
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const getUser = (req, res) => {
  console.log(req.body)
  User
    .find({email: req.params.email})
    .then((item) => {
      let filteredItem = []

      filteredItem.push({
          _id: item[0]._id,
          email: item[0].email,
          userType: item[0].userType
        })
      res.json(filteredItem)
    })
}

// В дальнейшем планирую вынести функцию createHash в отдельный файл

// makeSalt.makeSalt тоже переделаю

const createUser = (req, res) => {
  let salt = makeSalt.makeSalt()
  let email = req.body.email
  let password = crypto.createHash('sha256').update(salt + req.body.password + salt).digest('hex')

  let newUser = new User({
    email: email,
    password: password,
    hash: salt
  });

  newUser
    .save()
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const updateUser = (req, res) => {
  let _id = req.body.id
  let email = req.body.email
  let salt = makeSalt.makeSalt()
  let password = crypto.createHash('sha256').update(salt + req.body.password + salt).digest('hex')

  let newData = {
    email: email,
    password: password,
    hash: salt
  }

  User
    .updateOne({email: email}, newData)
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

const deleteUser = (req, res) => {
  let email = req.params.email

  User
    .deleteOne({ email: email })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)

      console.log(err)
    });
}

const clearUserDB = (req, res) => {
  User
    .deleteMany({})
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

module.exports = {

  getUsers: getUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  clearUserDB: clearUserDB

}
