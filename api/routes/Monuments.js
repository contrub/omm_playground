// Local schema
const Monument = require('../models/Monument');

const getMonuments = (req, res) => {
  Monument.find()
    .then((items) => res.json(items))
    .catch((err) => {
      res.sendStatus(500)
      console.log(err)
    });
}

const getMonument = (req, res) => {
  Monument
    .findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => {
      console.log(err)
      res.status(500).json({message: 'MongoDB error'})
    })
}

const createMonument = (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'MongoDB error'})
    })
}

const updateMonument = (req, res) => {
  Monument
    .updateOne({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'MongoDB error'})
    })
}

const deleteMonument = (req, res) => {
  Monument
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'MongoDB error'})
    });
}

const clearMonumentsDB = (req, res) => {
  Monument
    .deleteMany({})
    .then(() => res.sendStatus(204))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'MongoDB error'})
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
