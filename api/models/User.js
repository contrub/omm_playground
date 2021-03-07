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
  userRole: {
    type: String,
    enum: ['viewer', 'admin', 'superadmin'],
    default: 'viewer'
  },
  status: {
    type: String,
    enum: ['active', 'disable'],
    default: 'active'
  }
}, {
  versionKey: false
});

module.exports = User = mongoose.model('user', UserSchema);
