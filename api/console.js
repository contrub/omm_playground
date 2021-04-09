require('dotenv').config()

// Third party functions
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Local models
const User = require('./src/models/User');
const Monument = require('./src/models/Monument');

// Local path
const sAdminJSON = './src/resources/users.json';
const sMonumentsJSON = './src/resources/monuments.json';

mongoose.Promise = global.Promise

//=================MongoDB=================//

const MongoConnect = async () => {
  await mongoose
    .connect(
      process.env.MONGODB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));
}

//=================UsersDB=================//

const seedUsersDB = async () => {
  await MongoConnect()

  try {
    const rawUsers = fs.readFileSync(sAdminJSON)
    const users = JSON.parse(rawUsers)

    await Promise.all(
      await users.map(async (user) => await createUser(user))
    )
      .catch((err) => {
        console.log(`Promise error: ${err}`)
      })
  } catch (err) {
    console.log(`Parsing error: ${err}`)
  } finally {
    process.exit(0)
  }
}

const cleanUsersDB = async () => {
  await MongoConnect()

  try {
    const rawUsers = fs.readFileSync(sAdminJSON)
    const users = JSON.parse(rawUsers)

    await Promise.all(
      await users.map(async (user) => {
        await User
          .find({email: user.email})
          .then(async (user) => {
            if (user[0].email) {
              await deleteUser(user[0].email)
            }
          })
          .catch((err) => {
            console.log(`MongoDB error: ${err}`)
          })
      }))
      .catch((err) => {
        console.log(`Promise error: ${err}`)
      })
  } catch (err) {
    console.log(`Parsing error: ${err}`)
  } finally {
    process.exit(0)
  }
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
    .catch((err) => {
      console.log(`MongoDB error: ${err}`)
    })
}

const deleteUser = async (email) => {
  await User
    .deleteOne({email: email})
    .catch((err) => {
      console.log(`MongoDB error: ${err}`)
    })
}

//=================MonumentsDB=================//

const seedMonumentsDB = async () => {
  await MongoConnect()

  try {
    const rawMonuments = fs.readFileSync(sMonumentsJSON)
    const monuments = JSON.parse(rawMonuments)

    await Promise.all(
      await monuments.map(async (monument) => await createMonument(monument))
    )
      .catch((err) => {
        console.log(`Promise error: ${err}`)
      })
  } catch (err) {
    console.log(`Parsing error: ${err}`)
  } finally {
    process.exit(0)
  }
}

const cleanMonumentsDB = async () => {
  await MongoConnect()

  try {
    const rawMonuments = fs.readFileSync(sMonumentsJSON)
    const monuments = JSON.parse(rawMonuments)

    await Promise.all(
      await monuments.map(async (monument) => {
        await Monument
          .find({name: monument.name})
          .then(async (monument) => {
            console.log(monument[0].name)
            if (monument[0].name) {
              await deleteMonument(monument[0].name)
            }
          })
          .catch((err) => {
            console.log(`MongoDB error: ${err}`)
          })
      }))
      .catch((err) => {
        console.log(`Promise error: ${err}`)
      })
  } catch (err) {
    console.log(`Parsing error: ${err}`)
  } finally {
    process.exit(0)
  }
}

const createMonument = async (data) => {
  const newMonument = new Monument(data)

  await newMonument
    .save()
    .catch((err) => {
      console.log(`MongoDB error: ${err}`)
    })
}

const deleteMonument = async (name) => {
  await Monument
    .deleteOne({name: name})
    .catch((err) => {
      console.log(`MongoDB error ${err}`)
    })
}

module.exports = {
  clean_users: cleanUsersDB,
  seed_users: seedUsersDB,
  clean_monuments: cleanMonumentsDB,
  seed_monuments: seedMonumentsDB
}

