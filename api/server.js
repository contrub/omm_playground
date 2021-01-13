require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const app = express();
// Номер порта переносим в .env файл раз он уже создан
const port = 8000;

// Это тоже можно перенести в .env файл
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

/*
* Рекомендую реализовать следующим образом
*
* 1. Создаем директорию Controllers и в ней создаем файл AuthController.js
* 2. В AuthController.js описываем логику работы этого обработчика

const login = (req, res, next) => {
  const refreshToken = req.body.token;

  // Используй сравнение с приведением к типу ===
  // Этот метод надежнее и может уберечь от трудноуловимых ошибок https://learn.javascript.ru/comparison
  if (refreshToken === null) {
    // В дальнейшем напишем кастомный обработчик ошибок в который можно передавать статус ошибки и читаемое сообщение
    return res.status(401).send('Unauthorised');
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Unauthorised');

    if (decoded) {
      // Этот метод нужно вынести в utils
      // Добавить обработку ошибки либо сдесь либо в функции generateAccessToken
      // Смотри реализацию функции ниже
      const accessToken = generateAccessToken({ name: decoded.name });
      res.json({ accessToken: accessToken })
    }
  });

  next()
};

* 3. Нам необходимо использовать клас express.Router и передать в этот класс метод из AuthController.js
Здесь реализация может быть любой, это просто образец
const router = express.Router();
const AuthController = require('./controllers/AuthController');
router.post('/login', AuthController.login);
*/
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

/* Это тоже должно быть в AuthController */
app.use('/api/users', function (req, res, next) {
  /* Не нужно проверять метод, можно сделать app.post() или router.post() */
  if (req.method === 'POST') {
    // Лучше использовать email так как поле username не уникально
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
  }

  next()
})

/*
Вот это нужно реализовать с помощью промежуточных обработчиков и вызывать промежуточный обработчик перед каждым методом который
требует проверку токена

Образец:

Создаем директорию middlewares и переносим туда эту функцию
const checkValidToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) res.status(403).send('Forbidden. No token.');

  try {
    // Перенести jwt.verify в utils
    // В дата можно поместить кодированную информацию, например id пользователя и его userName
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.headers['isValid'] = true
  } catch (err) {
    res.status(404).send('Token verify error')
  }

  // Когда мы вызываем next(); - мы передаем управление следующему обработчкику в цепочке обработчиков
  next();
  В нашем примере это обработчик MonumentController.getMonuments
  Без next() цепочка обработчиков прервется
};

Создаем дирректорию controllers и в ней файл MonumentController.js
В нем getMonuments метод

app.get('/api/monuments', checkValidToken, MonumentController.getMonuments)

Аналогично этому примеру нужно описать все запросы которые требуют проверку токена
*/
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

// Подключение зависимостей должно быть вверху файла
const Monument = require('./models/Monument');
const User = require('./models/User')

/* 
Рекомендую создать директорию utils и в нее поместить все вспомогательные методы и функции, чтобы не разростался основной файл server.js
utils.js или utils -> createSauls.js
*/
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
/* 
У нас уже достаточно много маршрутов, /api/monuments /login и тд
В express.js есть модуль который отвечает за маршрутизацию

var router = express.Router();

https://expressjs.com/ru/guide/routing.html

С помощью него мы сможем разделить наш код на модули и не держать все в одном файле, в документации есть образец как это сделать
*/
app.get('/api/monuments', function (req, res) {
  // Переносим этот кусок в middlewares
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
/* 
Пароли нельзя отдавать, здесь необходимо удалить пароль и хеш из результатов
Также в будущем необходимо будет реализовать проверку на соответствующую роль,
только пользователь с админскими правами может выполнить этот запрос.
Проверка ролей должна быть реализована через middleware
*/
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
  /*
  В этой функции создания токена необходимо обработать ошибку либо выше где эта функция вызывается
  Смотри ниже реализацию этой функции с обработкой ошибки
  * */
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}

/*
ЭТО ОБРАЗЕЦ, РЕАЛИЗАЦИЯ МОЖЕТ БЫТЬ ЛЮБОЙ
const generateAccessToken = (payload, res) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    {
      // Вынести время жизни токена в .env = TOKEN_LIFE = 3600
      expiresIn: process.env.TOKEN_LIFE || 3600
    }, (err, token) => {
    if (err) {
      return res.status(401).send('Unauthorised');
    }
    res.send({
      success: true,
      accessToken: `Bearer ${token}`,
    });
  });
};

* */
// Номер порта переносим в .env файл раз он уже создан
app.listen(port, () => console.log(`Server listening on port: ${port}`));

