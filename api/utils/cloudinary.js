require('dotenv').config();
const cloudinary = require('cloudinary').v2
const isEmpty = require('validator/lib/isEmpty')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

uploadImage = async(req, res, next) => {
  try {
    const fileStr = req.body.base64;
    if (fileStr === undefined || isEmpty(fileStr)) {
      next()
    } else {
      await cloudinary.uploader.upload(fileStr, {
        folder: 'monuments'
      })
        .then((uploadResponse) => {
          const url = uploadResponse.secure_url
          req.body.imageURL = url
          next()
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500)
        })
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = {
  uploadImage: uploadImage
}
