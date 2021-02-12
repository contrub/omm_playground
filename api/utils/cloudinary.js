require('dotenv').config();
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

uploadImage = async(req, res, next) => {
  try {
    const fileStr = req.body.base64;
    if (fileStr === undefined || fileStr.length === 0) {
      delete req.body.base64
      next()
    } else {
      await cloudinary.uploader.upload(fileStr, {
        folder: 'monuments'
      })
        .then((uploadResponse) => {
          const url = uploadResponse.secure_url
          req.body.imageURL = url
          delete req.body.base64
          next()
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({message: 'Cloudinary service error' });
        })
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Something went wrong' });
  }
}

module.exports = {

  uploadImage: uploadImage

}
