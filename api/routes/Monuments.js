// Local schema
const Monument = require("../models/Monument");

// Error class
const ApiError = require("../error/ApiError");

const getMonuments = (req, res) => {
  Monument.find()
    .then((items) => res.json(items))
    .catch((err) => {
      res.status(500).json({message: 'MongoDB error'})
      console.log(err)
    });
}

const getMonument = (req, res) => {
  Monument
    .findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => {
      res.status(500).json({message: 'MongoDB error'})
      console.log(err)
    })
}

const createMonument = (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch((err) => {
      res.status(500).json({message: 'MongoDB error'})
      console.log(err)
    })
}

const updateMonument = (req, res) => {
  Monument
    .updateOne({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch((err) => {
      res.status(500).json({message: 'MongoDB error'})
      console.log(err)
    })
}

const deleteMonument = (req, res) => {
  Monument
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      res.status(500).json({message: 'MongoDB error'})
      console.log(err)
    });
}

const clearMonumentsDB = (req, res) => {
  Monument
    .deleteMany({})
    .then(() => res.sendStatus(204))
    .catch((err) => {
      res.status(500).json({message: 'MongoDB error'})
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
