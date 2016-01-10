var mongoose = require('mongoose');

var Pin =  require('./pin.js')

//esting with simple array for pins value

var userSchema = new mongoose.Schema({
  userName: { type: String, index: { unique: true } },
  password: String,
  pins: [{type: Schema.Type.ObjectId, ref: 'Pin'}]

});

var User = mongoose.model('User', userSchema);

module.exports = User;
