const port = 7000;

require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const cors = require('cors');

const whitelist = ['http://localhost:3000']

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: function(origin, callback) {

    if(!origin) return callback(null, true);
    // For postman chrome plugin
    if (origin && origin.match(/chrome-extension/) && origin.match(/chrome-extension/).length) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      let message = "The CORS policy for this origin doesn`t allow access from the particular origin.";
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
let refreshTokens = []

app.get('/', (req, res) => {
  res.json("Auth Server")
})

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {

  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

app.listen(port, () => console.log(`Server listening on port: ${port}`));
