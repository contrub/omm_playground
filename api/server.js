require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT

const postman = require('./utils/postman')
const routes = require('./routes')
const errorHandler = require('./helpers/error-handler')

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
app.use('/api', routes)
// app.use(errorHandler)

app.listen(port, () => console.log(`Server listening on port: ${port}`));

