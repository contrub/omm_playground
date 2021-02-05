const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum : ['user','admin'],
    default: 'user'
  }
}, {
  versionKey: false
});

module.exports = User = mongoose.model('user', UserSchema);
