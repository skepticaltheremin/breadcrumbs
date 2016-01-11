var React = require('react');

var Search = require('./Search');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');
var SearchUser = require('./SearchUser');

// MapApp contains the primary render statement that displays the map with 
// breadcrumbs and the users notes about the breadcrumbs. You can see this
// render() statement at the bottom MapApp.
var MapApp = React.createClass({

  getInitialState(){

    // Extract the favorite locations from local storage

    var favorites = [];

    if(localStorage.favorites){
      favorites = JSON.parse(localStorage.favorites);
    }

    // Let's intitally set our map on Hack Reactor, by default

    return {
      favorites: favorites,
      currentAddress: 'Hack Reactor',
      mapCoordinates: {
        lat: 37.7836966,
        lng: -122.4089664
      }
    };
  },

  // toggleFavorite(address){

  //   if(this.isAddressInFavorites(address)){
  //     this.removeFromFavorites(address);
  //   }
  //   else{
  //     this.addToFavorites(address);
  //   }
  // },

  // addToFavorites(address){

  //   var favorites = this.state.favorites;

  //   favorites.push({
  //     address: address,
  //     timestamp: Date.now()
  //   });

  //   this.setState({
  //     favorites: favorites
  //   });

  //   localStorage.favorites = JSON.stringify(favorites);
  // },

  // addToFavBreadCrumbs adds the data associated with a breadcrumb to
  // a user's collection of breadcrumbs.
  addToFavBreadCrumbs(id, lat, lng, timestamp, details, location) {
    // console.log(arguments);
    var favorites = this.state.favorites;
    // console.log(this.state.currentAddress);
    favorites.push({
      id: id,
      lat: lat,
      lng: lng,
      timestamp: timestamp,
      details: details,
      address: this.state.currentAddress,
      location: location
    });

    this.setState({
      favorites: favorites
    });

    // adds breadcrumb data to browser's local storage
    localStorage.favorites = JSON.stringify(favorites);
  },

  // removeFromFavorites(address){

  //   var favorites = this.state.favorites;
  //   var index = -1;

  //   for(var i = 0; i < favorites.length; i++){

  //     if(favorites[i].address == address){
  //       index = i;
  //       break;
  //     }

  //   }

  //   // If it was found, remove it from the favorites array

  //   if(index !== -1){
      
  //     favorites.splice(index, 1);

  //     this.setState({
  //       favorites: favorites
  //     });

  //     localStorage.favorites = JSON.stringify(favorites);
  //   }

  // },

  // isAddressInFavorites(address){

  //   var favorites = this.state.favorites;

  //   for(var i = 0; i < favorites.length; i++){

  //     if(favorites[i].address == address){
  //       return true;
  //     }

  //   }

  //   return false;
  // },

  // searchForAddress uses the GMaps library, which is built on top of
  // Google Maps, to find a street address
  searchForAddress(address, cb){
    var self = this;

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

        cb(results[0].formatted_address);

      }
    });

  },

  render(){

    return (

      <div>
        <h1>Breadcrumbs</h1>
        <SearchUser url="/api/users"/>
        <h1 className="col-xs-12 col-md-6 col-md-offset-3">My Breadcrumbs</h1>
        <Search onSearch={this.searchForAddress} />

        <Map lat={this.state.mapCoordinates.lat}
          lng={this.state.mapCoordinates.lng}
          favorites={this.state.favorites}
          /*onFavoriteToggle={this.toggleFavorite}*/
          onAddToFavBcs={this.addToFavBreadCrumbs}
          searchAddress={this.searchForAddress}
          address={this.state.currentAddress} />

        <LocationList locations={this.state.favorites}
          activeLocationAddress={this.state.currentAddress} 
          onClick={this.searchForAddress} />

      </div>

    );
  }

});

module.exports = MapApp;
