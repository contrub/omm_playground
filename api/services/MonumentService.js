const Monument = require('../models/Monument')
const isEmpty = require('validator/lib/isEmpty')

const isMonumentExist = (req, res, next) => {
  if (name === req.body) {
    res.sendStatus(404)
  } else {
    const name = req.body.name

    Monument
      .find({name: req.body.name})
      .then((item) => {
        if (item.length) {
          res.status(200).json({message: 'Monument already exist!'})
        } else {
          next()
        }
      })
      .catch(err => {
        res.sendStatus(500)
        console.log(err)
      })
    }
}

module.exports = {
  isMonumentExist: isMonumentExist
}
