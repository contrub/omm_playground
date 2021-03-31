// Third party functions
const cloudinary = require('cloudinary').v2
const isEmpty = require('validator/lib/isEmpty')
require('dotenv').config()

// Local class
const ApiError = require('../error/ApiError')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

uploadImage = async (req, res, next) => {
  const fileStr = req.body.base64

  if (fileStr !== undefined && !isEmpty(fileStr)) {
    await cloudinary.uploader.upload(fileStr, {
      folder: process.env.CLOUDINATY_FOLDER
    })
      .then((uploadResponse) => {
        const url = uploadResponse.secure_url
        req.body.imageURL = url
      })
      .catch((err) => {
        next(ApiError.internal('Cloudinary error'))
        console.log(err)
      })
  }
}

module.exports = {
  uploadImage: uploadImage
}
