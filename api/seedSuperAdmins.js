require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/User');
const superAdmins = require('./resources/superadmin.json')

mongoose.Promise = global.Promise

const MongoConnect = async () => {
  await mongoose
    .connect(
      process.env.MONGODB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
    .then(() => {
      console.log('MongoDB connected!')
    })
    .catch(err => console.log(err));
}

const dbClean = async () => {
  await superAdmins.map((superAdmin) => {
    User
      .deleteOne({email: superAdmin.email})
      .catch(e => console.log(e))
  })

  console.log('Successfully removed copies')
}

const dbSeed = () => {
  console.log('Seeding users ...')
  let count = 0
  for (let i = 0; i < superAdmins.length; i++) {
    const superAdmin = superAdmins[i]

    const newUser = new User({
      email: superAdmin.email,
      password: superAdmin.password,
      userRole: 'superadmin'
    })

    newUser
      .save()
      .then(count ++)
      .catch(e => console.log(e))
  }

  console.log(`Successfully added superadmins(${count}) in MongoDB`)
  process.exit(0) // возможно, иная реализация выхода из функции
}

MongoConnect()
  .then(dbClean)
  .then(dbSeed)

