//****************************************************
//These controller functions are called by the router,
//and manipulate the database.
//****************************************************
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Pin = require('../models/pin.js');

//////////////////
//users controllers
//////////////////

//Adds a new user; called when api/users hears a post request.
exports.addUser = function(newUser, callback) {
  User.create(newUser, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, person);
  });
};

//Removes a user; called when api/users hears a delete request.
exports.removeUser = function (name, callback) {
  User.remove(name, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, person);
  });
};

//////////////////
//pins controllers
//////////////////

//find pins of single user
exports.findOne = function (name, callback) {
  User.findOne(name, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, person.pins);
  });
};

//find user and add new pin to pins collection, one at a time
//called when api/maps/:username hears a post request
exports.addPin = function (name, newPin, callback) {
  if(!newPin){
    return;
  } else {
    var pinToCreate = new Pin(newPin);
    User.findOneAndUpdate(name, {$push: {pins: pinToCreate}}, function (err, doc) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, pinToCreate);
    });
  }
};


//remove last pin: only used in testing
exports.removeLastPin = function (name, callback) {


  User.findOne(name, function (err, doc) {
    console.log('remove from database');
    if (err) {
      callback(err);
      return;
    }

    console.log('doc:', doc);
    if(doc){
      var poppedPin = doc.pins.pop();

      doc.save();
    }
    callback(null, poppedPin);
  
  });

};


// updates a specific pin. Called when api/maps/:username hears a put request
exports.updatePins = function (name, pinId, newPin, callback) {
  User.findOne(name, function (err, user) {
    console.log('trying to update pin of id ', pinId);
    for (var i = 0; i < user.pins.length; i++) {
      if (user.pins[i]._id == pinId) {
        user.pins.splice(i,1);
        user.pins.splice(i,0,newPin);
        user.save();
        callback(err, newPin);
        return;
      }
    }
    return callback(Error('No such pin with this _id'));
  });
};

//deletes a specific pin. called when api/maps/:username hears a delete reqest 
exports.deletePin = function (name, pinId, callback) {
  User.findOne(name, function (err, user) {
    console.log('trying to delete pin');
    for (var i = 0; i < user.pins.length; i++) {
      var pin = user.pins[i];
      if (pin._id == pinId) {
        // user.pins = user.pins.slice(0, i ).concat(user.pins.slice(i+1));
        user.pins.splice(i,1);
        user.save();
        callback(err, pin);
      }
    }

  });
};

//get all people --for testing mostly
exports.getUser = function (query, callback) {
  var searchUser = query ? query : {};
  User.find(searchUser, function (err, persons) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, persons);
  });
};


//example pins
// [{"lat":37.78696217255432,"lng":-122.40696430206299,"timestamp":1452391665585,"details":{"note":"I LOVE this place."},"infoWindow":{"content":"<p>Dat info dohhh</p>"}},8

// {"lat":37.7865043039168,"lng":-122.40644931793213,"timestamp":1452391678701,"details":{"note":"I meh this place."},"infoWindow":{"content":"<p>llllalala</p>"}},
 

// {"lat":37.78613123179135,"lng":-122.40491509437561,"timestamp":1452394116848,"details":{"note":"I hate this place."},"infoWindow":{"content":"<p>skip skip</p>"}}]
