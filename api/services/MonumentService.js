const Monument = require('../models/Monument')
const ApiError = require('../error/ApiError')

const isMonumentExist = async (req, res, next) => {
  const id = req.params.id

  if (id === undefined) {
    next(ApiError.custom(404, 'Monument name undefined'))
  }

  //*
  // CastError: Cast to ObjectId failed for value "6032695d0b30b6271444efc" at path "_id" for model "monument"
  // При попытке отправить _id не соответвующему стандартам MongoDB ошибка от MongoDB: стоить оставлять или доп. обработчик ?
  // *//

  await Monument
    .findById(id)
    .then((item) => {
      req.isMonumentExist = item === null || item === undefined ? false : true
    })
    .catch((err) => {
      next(ApiError.internal('MongoDB error'))
      console.log(err)
    })
}

module.exports = {
  isMonumentExist: isMonumentExist
}
