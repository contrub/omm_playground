// Local schema
const Monument = require('../models/Monument')

// Local class
const ApiError = require('../error/ApiError')

const getMonuments = (req, res) => {
  Monument.find()
    .then((items) => res.json(items))
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    });
}

const getMonument = (req, res) => {
  Monument
    .findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    })
}

const createMonument = (req, res) => {
  const newMonument = new Monument(req.body);

  newMonument
    .save()
    .then((item) => res.json(item))
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    })
}

const updateMonument = (req, res) => {
  Monument
    .updateOne({_id: req.params.id}, req.body)
    .then((item) => res.json(item))
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    })
}

const deleteMonument = (req, res) => {
  Monument
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      // console.log(err)
      throw new ApiError.internal('MongoDB error')
    });
}

module.exports = {
  getMonuments: getMonuments,
  getMonument: getMonument,
  createMonument: createMonument,
  updateMonument: updateMonument,
  deleteMonument: deleteMonument
}
