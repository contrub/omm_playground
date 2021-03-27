// Third party functions
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MonumentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Неизвестно'
  },
  creator: {
    type: String,
    default: 'Неизвестно'
  },
  address: {
    type: String,
    default: 'Неизвестно'
  },
  date: {
    type: Date,
    default: Date.now
  },
  registryNumber: {
    type: String,
    default: 'Неизвестно'
  },
  imageURL: {
    type: String,
    default: 'https://res.cloudinary.com/gre354gfg/image/upload/v1613916683/monuments/static_monument_kzgbhy.png'
  }
}, {
  versionKey: false
});

module.exports = Monument = mongoose.model('monument', MonumentSchema);
