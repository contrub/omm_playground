require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT

const postman = require('./utils/postman')
const routes = require('./routes')

mongoose.Promise = global.Promise

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

app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(bodyParser.json());

app.use(cors({postman}))
app.use('/api', routes)

app.listen(port, () => console.log(`Server listening on port: ${port}`));

