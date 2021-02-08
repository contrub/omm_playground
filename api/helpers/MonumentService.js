const Monument = require('../models/Monument')

const isMonumentExist = (req, res, next) => {
  const name = req.body.name
  if (name === undefined) {
    res.status(404).send('Monument name undefined')
  }

  Monument
    .find({name: req.body.name})
    .then((item) => {
      if (item.length) {
        res.status(409).send('Monument already exist!')
      }
      else {
        next()
      }
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

module.exports = {

  isMonumentExist: isMonumentExist

}
