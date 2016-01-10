
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// var router = require('./routers/router.js')

var userController = require('./controllers/userControllers.js');

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/maps');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));
    
// app.use('/api', router);

// app.get("/", function (req, res) {
//   console.log('home')
//   res.send(__dirname + "..public/index.html");
// });

//redirect to home at a hash url
// need to add middleware for actual loging authentication
app.get('/signup', function(req, res){
  console.log('signup');

  res.redirect('/#map')
});

app.post('/login', function(req, res){
  console.log('signup');
  res.redirect('/#map')
})

//api 
app.get('/maps', function (req, res) {
  console.log('user get')
  userController.readAllUsers(function(err, person){
    if (err) {
      return res.json({err: err})
    }
    res.json(person)
  });
});

app.get('/maps/:username', function (req, res) {
  var username = req.params.username;
  console.log('findOne', username)

  userController.findOne({username: username}, function(err, person){
    if (err) {
      return res.json({err: err})
    }
    console.log(person)
    res.json(person)
  });

});

app.put('/maps/:username', function (req, res) {

  console.log('users put')
  console.log('req params', req.params)
  var username = req.params.username;
  // var newpin = req.body

  var newpin = {address: 'my address', lat: 10, lng: 20};

  userController.updatePins(username, newpin, function(err, pins){
     if (err) {
      return res.json({err: err});
    }
    console.log(pins)
    res.json(pins);

  });


// app.delete('/maps/:username', function (req, res) {

//   console.log('users put')
//   console.log('req params', req.params)
//   var username = req.params.username;
//   // var newpin = req.body

//   userController.removeLastPin(username, function(err, pins){
//      if (err) {
//       return res.json({err: err});
//     }
//     console.log(pins)
//     res.json(pins);
//   });
  
// });


});



console.log('mapp app on port ' + port);
app.listen(port);  
