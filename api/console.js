require('dotenv').config()

// Third party functions
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Local models
const User = require('./src/models/User');

// Local path
const sAdminJSON = './src/resources/superadmin.json';

mongoose.Promise = global.Promise

const MongoConnect = async () => {
  await mongoose
    .connect(
      process.env.MONGODB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
    // .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));
}

const deleteUser = async (email) => {
  await User
    .deleteOne({ email: email })
    .catch(err => console.log(err))
}

const createUser = async (data) => {
  const password = bcrypt.hashSync(data.password, 12)

  const newUser = new User({
    email: data.email,
    password: password,
    userRole: data.userRole,
    status: data.status
  })

  await newUser
    .save()
    .catch(err => console.log(err))
}

const cleanCopiesDB = async () => {
  await MongoConnect()

  try {
    const rawUsers = fs.readFileSync(sAdminJSON)
    const users = JSON.parse(rawUsers)

    await Promise.all(
      await users.map(async user => {
        await User
          .find({email: user.email})
          .then(async (items) => {
            // рассмотреть случай нескольких копий
            if (items.length) {
              await deleteUser(items[0].email)
            }
          })
          .catch((err) => console.log(err))
    }))
      .catch(e => console.log(`Promise error: ${e}`))

  } catch (e) {

    console.log(`Parsing error: ${e}`)

  } finally {

    process.exit(0)

  }
}

const seedUsersDB = async () => {
  await MongoConnect()

  try {
    const rawUsers = fs.readFileSync(sAdminJSON)
    const users = JSON.parse(rawUsers)

    await Promise.all(
      await users.map(async user => await createUser(user))
    )
      .catch(e => console.log(`Promise error: ${e}`))
  } catch (e) {

    console.log(`Parsing error: ${e}`)

  } finally {

    process.exit(0)

  }
}

module.exports = {

  clean: cleanCopiesDB,
  seed: seedUsersDB

}

