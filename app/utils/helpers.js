
var getAllBreadCrumbs = function(username, cb) {
  console.log(username);
  $.ajax({
    url: '/api/maps/' + username,
    type: 'GET',
    success: function(data) {
      // this.setState({data: data});
      console.log(data);
      return cb(data);
    },
    error: function(xhr, status, err) {
      console.log(status, err.toString());
    }
  });
};

var addBreadCrumb = function(username, breadcrumb, cb) {
  console.log(username);
  $.ajax({
    url: '/api/maps/' + username,
    dataType: 'json',
    type: 'POST',
    data: breadcrumb,
    success: function(data) {
      // this.setState({data: data});
      console.log(data);
      return cb(data);
    },
    error: function(xhr, status, err) {
      console.log(status, err.toString());
    }
  });
};

var signupUser = function(username, password, cb){
  console.log(username,password);
  var user = {
    username: username,
    password: password
  };
  $.ajax({
    url: '/api/users',
    type: 'POST',
    data: user,
    dataType: 'json',
    success: function(data){
      window.location.href = "#map";
      if(cb){
        cb(data);
      }
    },
    error: function(xhr, status, err) {
      console.log("err");
      console.log(xhr.toString(), status.toString(), err.toString());
      // console.log(status, err.toString());
    }

  });
};

var login = function(username, password, cb){
  console.log(username,password);
  var user = {
    username: username,
    password: password
  };
  $.ajax({
    url: '/api/users', //This needs to be a different route for login. not yet implemented
    type: 'POST',
    data: user,
    dataType: 'json',
    success: function(data){
      window.location.href = "#map";
      if(cb){
        cb(data);
      }
    },
    error: function(xhr, status, err) {
      console.log("err");
      console.log(xhr.toString(), status.toString(), err.toString());
      // console.log(status, err.toString());
    }

  });
};

var updatePin = function(username, pinId, updatedPin, cb) {
  $.ajax({
    url: '/api/maps/' + username,
    type: 'PUT',
    data: {
      _id: pinId,
      newPin: updatedPin
    },
    dataType: 'json',
    success: function(data){
      cb(data);
    },
    error: function(xhr, status, err) {
      console.log("err");
      console.log(xhr.toString(), status.toString(), err.toString());
    }
  });
};

var helpers = {
  getAllBreadCrumbs: getAllBreadCrumbs,
  addBreadCrumb: addBreadCrumb,
  signupUser: signupUser,
  login: login,
  updatePin: updatePin
};

module.exports = helpers;
