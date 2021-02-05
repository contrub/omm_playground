const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonumentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  address: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  builder: {
    type: String
  },
  sculptor: {
    type: String
  },
  architect: {
    type: String
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
