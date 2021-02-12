const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonumentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Нет информации'
  },
  address: {
    type: String,
    default: 'Неизвестно'
  },
  date: {
    type: Date,
    default: Date.now
  },
  builder: {
    type: String,
    default: 'Неизвестно'
  },
  sculptor: {
    type: String,
    default: 'Неизвестно'
  },
  architect: {
    type: String,
    default: 'Неизвестно'
  },
  imageURL: {
    type: String,
    default: 'https://res.cloudinary.com/gre354gfg/image/upload/v1612550951/monuments/default_monument_lgovnw.png'
  }
  // monumentView: {
  //   type: String
  // },
  // registryNumber: {
  //   type: String
  // }
}, {
  versionKey: false
});

module.exports = Monument = mongoose.model('monument', MonumentSchema);
