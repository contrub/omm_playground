const Monument = require('../models/Monument')
const isEmpty = require('validator/lib/isEmpty')

const isMonumentExist = (req, res, next) => {
  const name = req.body.name

  if (name === undefined || isEmpty(name)) res.status(404).json({message: 'Monument name undefined'})

  Monument
    .find({name: req.body.name})
    .then((item) => {
      if (item.length) res.status(409).json({message: 'Monument already exist!'})
      else next()
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

validateData = (req, res, next) => {
  const name = req.body.name

  if (name === undefined || isEmpty(name)) res.status(404).json({message: "Monument name undefined"})
  else next()

}

module.exports = {

  isMonumentExist: isMonumentExist,
  validateData: validateData

}
