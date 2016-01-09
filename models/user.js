var mongoose = require('mongoose');
var pinSchema =  require('pin.js').schema

var userSchema = new mongoose.Schema({
  userName: { type: String, index: { unique: true } },
  password: String,
  pins: [pinSchema],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
