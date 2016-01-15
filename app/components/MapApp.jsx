var React = require('react');

var Search = require('./Search.jsx');
var Map = require('./Map.jsx');
var CurrentLocation = require('./CurrentLocation.jsx');
var LocationList = require('./LocationList.jsx');
var SearchUser = require('./SearchUser.jsx');
var helpers = require('../utils/helpers');
var Signup = require('./Signup.jsx');
var EditItem = require('./EditItem.jsx')
var DropDown = require('./DropDown.jsx')


var MapApp = React.createClass({

  getInitialState(){

    // Extract the favorite locations from local storage

    var favorites = [];

    return {
      user: '',
      loggedin: false,
      favorites: favorites,
      filter: 'All',
      currentAddress: 'Hack Reactor',
      mapCoordinates: {
        lat: 37.7836966,
        lng: -122.4089664
      },
      center: {
        lat: 37.7836966,
        lng: -122.4089664
      },
      editingPin: {}
    };
  },

  loginUser(username){
    console.log("logged in:", username);
    this.setState({user: username, loggedin: true}); 
    helpers.getAllBreadCrumbs(username, function(data){
      if(data){
        this.setState({favorites: data});
      }
    }.bind(this));

  },

  componentDidMount(){
  },

  addToFavBreadCrumbs(id, lat, lng, timestamp, details, location, category) {
    var favorites = this.state.favorites;
    var breadcrumb = {
      id: id,
      lat: lat,
      lng: lng,
      timestamp: timestamp,
      details: details,
      address: this.state.currentAddress,
      location: location,
      category: category
    };

    helpers.addBreadCrumb(this.state.user, breadcrumb, function(data){
      this.setState({favorites: this.state.favorites.concat(data)});
    }.bind(this));
    localStorage.favorites = JSON.stringify(favorites);

  },

  searchForAddress(address, cb, recenter){
    var self = this;
    console.log("search called", address);

    // We will use GMaps' geocode functionality,
    // which is built on top of the Google Maps API

    GMaps.geocode({
      address: address,
      callback: function(results, status) {

        if (status !== 'OK') return;

        var latlng = results[0].geometry.location;

        self.setState({
          currentAddress: results[0].formatted_address,
          mapCoordinates: {
            lat: latlng.lat(),
            lng: latlng.lng()
          }
        });

        if(recenter){
          self.setState({
            center: {
              lat: latlng.lat(),
              lng: latlng.lng()
            }
          });
        }

        if(cb){
          cb(results[0].formatted_address); 
        }

      }
    });

  },

  setEdit: function (pinObject) {
    this.setState({editingPin: pinObject});
  },

  modifyPin(data) {
    for (var i = 0; i < this.state.favorites.length; i++ ) {
      if (this.state.favorites[i]._id === data._id) {
        this.setState({
          // find the appropriate pin to update. PITA due to pure function restriction
          favorites: this.state.favorites.slice(0,i).concat(data).concat(this.state.favorites.slice(i+1))
        });
      }
    }
  },

  updatePin(_id, newPin){
    alert('update pin from editItem is hooked up');
    console.log(_id, newPin);
    // helpers.updatePin(this.state.user, _id, newPin, this.modifyPin).bind(this);
  },

  handleCategoryChange(categoryName) {
    this.setState({filter: categoryName});
  },

  render(){
    if(this.state.loggedin){
      return (

        <div>
          <EditItem title="EDIT" pinObject={this.state.editingPin} updatePin={this.updatePin} />
          <h1 className="col-xs-12 col-md-6 col-md-offset-3">My Breadcrumbs</h1>
          <Search onSearch={this.searchForAddress} />
          <label htmlFor="category">Filter:</label>
          <DropDown id='category' title='All' items={['All', 'Food', 'Nature', 'Pets', 'Sports', 'Music', 'General']} whenSelected={this.handleCategoryChange} />

          <Map lat={this.state.mapCoordinates.lat}
            lng={this.state.mapCoordinates.lng}
            favorites={this.state.favorites}
            onFavoriteToggle={this.toggleFavorite}
            onAddToFavBcs={this.addToFavBreadCrumbs}
            searchAddress={this.searchForAddress}
            address={this.state.currentAddress} 
            center={this.state.center} 
            loginUser={this.loginUser}
            user={this.state.user} />

          <LocationList locations={this.state.favorites}
            activeLocationAddress={this.state.currentAddress} 
            onClick={this.searchForAddress} setEdit={this.setEdit} filter={this.state.filter}/>          
        </div>

      );
    } else {
      return <Signup loginUser={this.loginUser}/>
    }
  }

});

module.exports = MapApp;
