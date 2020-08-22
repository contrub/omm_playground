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
  monumentView: {
    type: String
  },
  registryNumber: {
    type: String
  }
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = Monument = mongoose.model('monument', MonumentSchema);