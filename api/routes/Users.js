const User = require('../models/User');
const makeSalt = require('../utils/createSault')
const crypto = require('crypto')

getUsers = (req, res) => {
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

getUser = (req, res) => {
  User
    .find({_id: req.params.id})
    .then((item) => {
      res.json(item[0])
    })
}

// В дальнейшем планирую вынести функцию createHash в отдельный файл

// makeSalt.makeSalt тоже переделаю

createUser = (req, res) => {
  let salt = makeSalt.makeSalt()
  let email = req.body.email
  let password = crypto.createHash('sha256').update(salt + req.body.password + salt).digest('hex')

  let newUser = new User({
    hash: salt,
    email: email,
    password: password
  });

  newUser
    .save()
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

updateUser = (req, res) => {
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
    .updateOne({_id: _id}, newData)
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

deleteUser = (req, res) => {
  let _id = req.params.id

  User
    .deleteOne({ _id: _id })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)

      console.log(err)
    });
}

clearUserDB = (req, res) => {
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
