require('dotenv').config()

// Third party modules
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')


// Local modules
const postman = require('./src/utils/postman')
const routes = require('./routes')

// Local functions
const apiErrorHandler = require('./src/error/api-error-handler')

const app = express()
const port = process.env.PORT

mongoose.Promise = global.Promise

mongoose
  .connect(
    process.env.MONGODB_URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(cors({postman}))
app.use('/', routes)
app.use(apiErrorHandler)

app.listen(port, () => console.log(`Server listening on port: ${port}`));

