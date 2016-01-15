
var mongoose = require('mongoose');




var userSchema = new mongoose.Schema({
  username: { type: String, index: { unique: true } },
  name: String,
  avatar: String,
  pins: Array
});


var User = mongoose.model('User', userSchema);


module.exports = User;
