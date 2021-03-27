// Third pary functions
const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

uploadImage = async(req, res, next) => {
  const fileStr = req.body.base64

  if (fileStr === undefined) {
    next()
  } else {
    await cloudinary.uploader.upload(fileStr, {
      folder: process.env.CLOUDINATY_FOLDER
    })
      .then((uploadResponse) => {
        const url = uploadResponse.secure_url
        req.body.imageURL = url
        next()
      })
      .catch((err) => {
        res.status(500).json({message: 'Cloudinary error'})
        console.log(err)
      })
  }
}

module.exports = {
  uploadImage: uploadImage
}
