var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
  note: String,
  address String,
  lat: Number,
  lng: Number,
  details Object,
  timestamp Number
});

var Pin = mongoose.model('Pin', userSchema);

module.exports.pin = Pin;
module.exports.schema = pinSchema;
