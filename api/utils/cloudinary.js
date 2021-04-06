// Local class
const ApiError = require('../error/ApiError')

// Third party modules
const cloudinary = require('cloudinary').v2

// Third party functions
const isEmpty = require('validator/lib/isEmpty')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

uploadImage = async (req, res, next) => {
  const fileStr = req.body.base64

  if (fileStr !== undefined && !isEmpty(fileStr)) {
    await cloudinary.uploader.upload(fileStr, {folder: process.env.CLOUDINATY_FOLDER})
      .then((res) => {
        const url = res.url
        req.body.imageURL = url
      })
      .catch((err) => {
        next(ApiError.internal('Cloudinary error'))
        console.log(err)
      })
  }
}

deleteImage = async (req, res, next) => {
  const imagePublicID = req.body.imagePublicID

  if (imagePublicID !== undefined && !isEmpty(imagePublicID) && imagePublicID !== process.env.DEFAULT_MONUMENT_IMAGE_PUBLIC_ID) {
    await cloudinary.api.delete_resources([imagePublicID])
      .catch((err) => {
        next(ApiError.internal('Cloudinary error'))
        console.log(err)
      })
  }
}

module.exports = {
  uploadImage: uploadImage,
  deleteImage: deleteImage
}
