// Third party modules
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MonumentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Unknown'
  },
  creator: {
    type: String,
    default: 'Unknown'
  },
  address: {
    type: String,
    default: 'Unknown'
  },
  buildDate: {
    type: Date,
    default: Date.now
  },
  imageURL: {
    type: String,
    default: process.env.DEFAULT_MONUMENT_IMAGE_URL
  }
}, {
  versionKey: false
})

module.exports = Monument = mongoose.model('monument', MonumentSchema);
