const Monument = require('../models/Monument');

const getMonuments = (req, res) => {
  Monument.find()
    .then(items => {
      res.json(items)
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const getMonument = (req, res) => {
  Monument
    .find({ _id: req.params.id})
    .then(item => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const createMonument = (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const updateMonument = (req, res) => {
  Monument
    .update({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

const deleteMonument = (req, res) => {
  Monument
    .deleteOne({ _id: req.params.id })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const clearMonumentsDB = (req, res) => {
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
