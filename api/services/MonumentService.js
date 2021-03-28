const Monument = require('../models/Monument')

const isMonumentExist = (req, res, next) => {
  if (req.body.name === undefined) {
    res.status(404).json({message: 'Monument name undefined'})
  } else {
    const name = req.body.name

    Monument
      .find({name: name})
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
