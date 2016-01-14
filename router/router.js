
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var path = require('path');

var router = express.Router();
var userController = require('../controllers/userControllers.js');
//*Requirerd by server.js*

console.log('using router...')

//////////////////
//users 
//////////////////

// retrieve users by query via req.body. If req.body is empty, should return all users
router.route('/users')
  .get(function (req, res) {
    console.log('user get', req.body);
    userController.getUser(function(err, person){
      if (err) {
        return res.json({err: err});
      }
      res.json(person);
    });
  });

//create user
router.route('/users')
  .post(function (req, res) {
    //example:
    console.log("post to /users", req.body.username, req.body.name, req.body.avatar);
    var newuser = {
      username: req.body.username,
      name: req.body.name,
      avatar: req.body.avatar,
      pins: []
    };

    userController.addUser(newuser, function(err, user){
       if (err) {
        console.log(err);
        return res.json({err: err});
      }
      res.status(201).json(user);
    });
  });

//delete user
router.route('/users')
  .delete(function (req, res) {
    userController.removeUser({username: req.body.username}, function(err, user){
       if (err) {
        return res.json({err: err});
      }
      res.json(user);
    });
  });

//////////////////
//pins
//////////////////

//get array of pins for single user
router.route('/maps/:username')
  .get(function (req, res) {
    var username = req.params.username;

    userController.findOne({username: username}, function(err, person){
      if (err) {
        return res.json({err: err})
      }
      //sends back entire person object currently. refactor to only the pins array
      res.json(person)
    });
  });

//insert new pin in pins array on user obj
router.route('/maps/:username')
  .put(function (req, res) {
    var username = req.params.username;
    var newpin = req.body;

    if(JSON.stringify(newpin) !== JSON.stringify({})){  
      userController.updatePins({username: username}, newpin, function(err, pins){
         if (err) {
          return res.json({err: err});
        }
        res.json(pins)

      });
    } else {
      res.json({})
    }


  });

// delete last pin from array
// router.route('/maps/:username')
//   .delete(function (req, res) {
//     var username = req.params.username;
//     userController.removeLastPin({userName: username}, function(err, pins){
//        if (err) {
//         return res.json({err: err});
//       }
//       res.json(pins);
//     });
//   });

//delete a spcific pin
router.route('/maps/:username')
  .delete(function (req, res) {
    var username = req.params.username;
    var pinId = req.body._id;
    userController.deletePin({username: username}, pinId, function(err, doc) {
      if (err) {
        return res.json({err: err});
      }
      res.json(doc);
    });
  });



module.exports = router;
