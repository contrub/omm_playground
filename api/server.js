const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;
const whitelist = ['http://localhost:3000']

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: function(origin, callback) {

    if(!origin) return callback(null, true);
    // For postman chrome plugin
    if (origin && origin.match(/chrome-extension/) && origin.match(/chrome-extension/).length) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = "The CORS policy for this origin doesn`t " +
      "allow access from the particular origin.";
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

mongoose
  .connect(
    'mongodb://mongo:27017/omm',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Monument = require('./models/Monument');

app.get('/api/monuments', function (req, res) {
  Monument.find()
    .then(items => res.json(items))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
});

app.get('/api/monuments/:id', function (req, res) {
  Monument
    .find({ _id: req.params.id })
    .then(item => res.json(item))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
});

app.put('/api/monuments/:id', function (req, res) {
  Monument 
    .update({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    })
});

app.post('/api/monuments', (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
});

app.delete('/api/monuments/:id', function (req, res) {
  Monument
    .deleteOne({ _id: req.params.id })
    .then(() => res.send(200))
    .catch(err => {
      res.status(500).send('Something Wrong!')
      console.log(err)
    });
})

app.listen(port, () => console.log(`Server listening on port: ${port}`));
