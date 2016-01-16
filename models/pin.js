var mongoose = require('mongoose');
//Required by userController.js

var pinSchema = new mongoose.Schema({
  id: Number,
  address: String,
  lat: Number, //latatude
  lng: Number, //longatude
  details: {},
  timestamp: Date,
  location: String,
  category: String
});


var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;


