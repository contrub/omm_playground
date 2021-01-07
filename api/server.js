require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const app = express();
const port = 8000;
const whitelist = ['http://localhost:3000']
mongoose.Promise = global.Promise; // fixed DeprecationWarning

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: function(origin, callback) {

    if(!origin) return callback(null, true);
    // For postman chrome plugin
    if (origin && origin.match(/chrome-extension/) && origin.match(/chrome-extension/).length) return callback(null, true);
    if (whitelist.indexOf(origin) === -1){
      let message = "The CORS policy for this origin doesn`t " +
        "allow access from the particular origin.";
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

app.use('/login', function (req, res, next) {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
  next()
})

app.use('/api/users', function (req, res, next) {
  if (req.method === 'POST') {
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
  }

  next()
})

app.use('/api/monuments', function (req, res, next) {
  if (req.method === "GET") {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (accessToken == null) return res.sendStatus(401)
    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      req.headers['isValid'] = true
    } catch (TokenExpiredError) {
      req.headers['isValid'] = false
    }
  }

  next()

})

mongoose
  .connect(
    'mongodb+srv://ommAdmin:L5icohuVNLKYDHkW@cluster0.qs1ej.mongodb.net/OMM?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Monument = require('./models/Monument');
const User = require('./models/User')

function makeSault(len) {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz";

  for (len; len > 0; len-- ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

// Monument

// authenticateToken

app.get('/api/monuments', function (req, res) {
  let accessToken = ''
  let isValid = req.headers['isValid']
  if (!isValid) {
    const refreshToken = req.query.refreshToken
    if (refreshToken == null) return res.sendStatus(401)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      accessToken = generateAccessToken({ name: user.email })
    })
  }
  Monument.find()
    .then(items => res.json({monuments: items, accessToken: accessToken}))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
});

app.get('/api/monuments/:id', function (req, res) {
  Monument
    .find({ _id: req.params.id })
    .then(item => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
});

app.put('/api/monuments/:id', function (req, res) {
  Monument
    .update({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
});

app.post('/api/monuments', (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
});

app.delete('/api/monuments/:id', function (req, res) {
  Monument
    .deleteOne({ _id: req.params.id })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
})

app.delete('/api/db/monuments/clear', function (req, res) {

  Monument
    .deleteMany({})
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })

});

// Users

app.get('/api/users', function (req, res) {

  User.find()
    .then(items => res.json(items))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
});

app.get('/api/users/:email', function (req, res) {

  User
    .find({email: req.query.email})
    .then((item) => {
      if (!item.length) {
        res.json(item)
      } else {
        let password = crypto.createHash('sha256').update(item[0].hash + req.query.password + item[0].hash).digest('hex')
        if (password === item[0].password) {
          res.json(item)
        } else {
          res.json([{email: item[0].email}])
        }
      }
    })
});

app.put('/api/users/:email', function (req, res) {

  let email = req.query.email
  let salt = makeSault(15)
  let password = crypto.createHash('sha256').update(req.query.salt + req.query.password + req.query.salt).digest('hex')

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
});

app.post('/api/users', function (req, res) {

  let salt = makeSault(15)
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
});

app.delete('/api/users/:email', function (req, res) {

  let email = req.params.email

  User
    .deleteOne({ email: email })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
})

app.delete('/api/db/users/clear', function (req, res) {

  User
    .deleteMany({})
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })

});

// Authentication

app.delete('/logout', (req, res) => {
  // res.clearCookie('accessToken')
  res.sendStatus(204)
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}

app.listen(port, () => console.log(`Server listening on port: ${port}`));

