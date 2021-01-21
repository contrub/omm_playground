const Monument = require('../models/Monument');

getMonuments = (req, res) => {
  const accessToken = res.req.body.token

  Monument.find()
    .then(items => res.json({monuments: items, accessToken: accessToken}))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

getMonument = (req, res) => {
  const accessToken = res.req.body.token

  Monument
    .find({ _id: req.params.id})
    .then(item => res.json({monument: item, accessToken: accessToken}))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

createMonument = (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

updateMonument = (req, res) => {
  Monument
    .update({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

deleteMonument = (req, res) => {
  Monument
    .deleteOne({ _id: req.params.id })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

clearMonumentsDB = (req, res) => {
  Monument
    .deleteMany({})
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

module.exports = {

  getMonuments: getMonuments,
  getMonument: getMonument,
  createMonument: createMonument,
  updateMonument: updateMonument,
  deleteMonument: deleteMonument,
  clearMonumentsDB: clearMonumentsDB

}
