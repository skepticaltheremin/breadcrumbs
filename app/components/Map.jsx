var React = require('react');
var helpers = require('../utils/helpers');
var DropDown = require('./DropDown.jsx')

var Map = React.createClass({
  getInitialState(){
    return {
      location: '',
      breadcrumbs: [],
      lat: this.props.lat,
      lng: this.props.lng,
      previousMarker: null,
      currentMarker: null,
      lastMarkerTimeStamp: null,
      map: null,
      category: 'General',
      saved: false,
      old: false
    }
  },

  handleLocationChange(e) {
    this.setState({location: e.target.value});
  },

  handleCommentChange(e) {
    this.setState({comment: e.target.value});
  },
  handleCategoryChange(categoryName) {
    this.setState({category: categoryName},
    function(){
      if(this.state.currentMarker && !this.state.saved){
        this.state.currentMarker.setIcon({
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          strokeColor:this.colorGenerator(this.state.category),
          scale: 10
        });
      }
    }.bind(this));
  },


  matchBreadCrumb(timestamp){
    var breadcrumbs = this.props.favorites;
    for(var i = breadcrumbs.length - 1; i >= 0; i--){
      var breadcrumb = breadcrumbs[i];
      if(breadcrumb.timestamp === timestamp){
        this.setState({location: breadcrumb.location, comment: breadcrumb.details.note})
        return;
      }
    }

  },

  toggleFavorite(address){
    this.props.onFavoriteToggle(address);
  },

  addFavBreadCrumb(id, lat, lng, timestamp, details, infoWindow, location, category) {
    this.props.onAddToFavBcs(id, lat, lng, timestamp, details, infoWindow, location, category);
  },

  updateCurrentLocation(){
    if(this.state.previousMarker){
      this.state.previousMarker.setIcon({
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        strokeColor:this.state.previousMarker.icon.strokeColor,
        scale: 5
      });
    }
    if(!this.state.old){
      this.state.currentMarker.setIcon({
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        strokeColor:this.colorGenerator(this.state.category),
        scale: 10
      });
    }
    this.state.previousMarker = this.state.currentMarker;
  },

  componentDidMount(){

    // Only componentDidMount is called when the component is first added to
    // the page. This is why we are calling the following method manually. 
    // This makes sure that our map initialization code is run the first time.

    // this.componentDidUpdate();
    var self = this;
    var map = new GMaps({
      el: '#map',
      lat: this.props.lat,
      lng: this.props.lng,
      styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

    });

    this.setState({map: map});

    //Right Click Menu
    map.setContextMenu({
      control: 'map',
      options: [{
        title: 'Add Bread Crumb',
        name: 'add_bread_crumb',
        action: function(e) {
          self.setState({saved: false, old: false});
          var addressString = e.latLng.lat().toString() + " " +  e.latLng.lng().toString();
          self.props.searchAddress(addressString, function(newLocation){
            self.setState({location: newLocation, comment: "Add comments here and save breadcrumb"});
          });
          var id = self.props.favorites.length;
          var time = Date.now();
          self.setState({lastMarkerTimeStamp: time});
          var marker = this.addMarker({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            title: 'New marker',
            id: id,
            timestamp: time,
            icon: {
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              strokeColor: self.colorGenerator(self.state.category),
              scale: 5
            },
            // infoWindow: {
            //   content: '<p style="height:200px; width: 800px;">HTML Content </p>'
            // },
            click: function(e) {
              if(this.state.currentMarker){
              self.setState({previousMarker: this.state.currentMarker});
              }
              self.setState({currentMarker: this});
              self.updateCurrentLocation();
              self.matchBreadCrumb(e.timestamp);
              // this.setMap(null);
            }
          });
          self.setState({currentMarker: marker});
          self.updateCurrentLocation();
          // self.addFavBreadCrumb(id, e.latLng.lat(), e.latLng.lng(), Date.now(), {note: "I LOVE this place."}, {content: '<p>Dat info dohhh</p>'});
        }
      }, {
        title: 'Center here',
        name: 'center_here',
        action: function(e) {
          this.setCenter(e.latLng.lat(), e.latLng.lng());
        }
      }]
    });
  this.refreshMap(map);

    // map.addMarkers(this.props.favorites); //no longer used
  },
  refreshMap(map){
    var self = this;

    helpers.getAllBreadCrumbs(this.props.user, function(data){
      if(!data){
        return;
      }
      self.setState({breadcrumbs: data});
      self.state.breadcrumbs.forEach(function(favorite, index){
        map.addMarker({
          lat: favorite.lat,
          lng: favorite.lng,
          title: 'New marker',
          id: index,
          timestamp: favorite.timestamp,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: self.colorGenerator(favorite.category),
            scale: 5
          },
          click: function(e) {
            self.setState({saved: true, old: true},function(){
              e.setIcon({
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                strokeColor:e.icon.strokeColor,
                scale: 10
              });
              // self.setState({currentMarker: this});
              // self.updateCurrentLocation();
              self.matchBreadCrumb(e.timestamp);
              self.setState({currentMarker: e},function(){
                self.updateCurrentLocation();
              });
            });
            // self.state.currentMarker.setMap(null);
          }
        });

      });
    });
  },


  colorGenerator(input){
    if(input === 'Food'){
      return 'red';
    }else if(input === 'Nature'){
      return 'green';
    }else if(input === 'Sports'){
      return 'yellow';
    }else if(input === 'Pets'){
      return 'orange';
    }else if(input === 'Music'){
      return 'blue';
    }else if(input === 'General'){
      return 'black';
    }else{
      return 'purple';
    }
  },

  componentDidUpdate(){
    if(this.props.favorites.length !== this.state.breadcrumbs.length){
      this.setState({breadcrumbs: this.props.favorites});
      return;
    }
    if(this.lastLat == this.props.center.lat && this.lastLng == this.props.center.lng){

      // The map has already been initialized at this address.
      // Return from this method so that we don't reinitialize it
      // (and cause it to flicker).

      return;
    }

    this.state.map.setCenter(this.props.center.lat, this.props.center.lng);
    this.lastLat = this.props.center.lat;
    this.lastLng = this.props.center.lng

    // var map = new GMaps({
    //   el: '#map',
    //   lat: this.props.lat,
    //   lng: this.props.lng,
    //   click: function(e) {
    //     var addressString = e.latLng.lat().toString() + " " +  e.latLng.lng().toString();
    //     // self.searchForAddress(addressString);
    //     self.props.searchAddress(addressString);
    //     map.addMarker({
    //       address: e.latLng.lat().toString() + e.latLng.lng().toString(),
    //       lat: e.latLng.lat(),
    //       lng: e.latLng.lng(),
    //       details: {
    //         note: "I LOVE this place."
    //       },
    //       infoWindow: {
    //         content: '<p>Dat info dohhh</p>'
    //       }
    //     });
    //     bindContext.addFavBreadCrumb(e.latLng.lat(), e.latLng.lng(), Date.now(), {note: "I LOVE this place."}, {content: '<p>Dat info dohhh</p>'});
    //   },
    //   styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

    // });

    // map.setContextMenu({
    //   control: 'map',
    //   options: [{
    //     title: 'Add Bread Crumb',
    //     name: 'add_bread_crumb',
    //     action: function(e) {
    //       var addressString = e.latLng.lat().toString() + " " +  e.latLng.lng().toString();
    //       console.log("rightclick")
    //       self.searchAddress(addressString);
    //       this.addMarker({
    //         lat: e.latLng.lat(),
    //         lng: e.latLng.lng(),
    //         title: 'New marker',
    //         // infoWindow: {
    //         //   content: '<p>HTML Content</p>'
    //         // },
    //         click: function(e) {
    //           console.log(e);
    //         }
    //       });
    //     }
    //   }, {
    //     title: 'Center here',
    //     name: 'center_here',
    //     action: function(e) {
    //       this.setCenter(e.latLng.lat(), e.latLng.lng());
    //     }
    //   }]
    // });

    // Adding a marker to the location we are showing
    
    // map.addMarker({
    //   lat: this.props.lat,
    //   lng: this.props.lng
    //   // icon: '/'
    // });

    // map.addMarkers(this.props.favorites);

  },

  handleSubmit(e) {
    e.preventDefault();
    var id = this.props.favorites.length;
    var timestamp = this.state.lastMarkerTimeStamp;
    this.addFavBreadCrumb(id, this.props.lat, this.props.lng, timestamp, {note: this.state.comment}, this.state.location, this.state.category);
    // this.state.currentMarker.setMap(null);
    this.setState({location: '', comment: '', saved: true});
  },

  render(){

    return (
      <div>
      <div className="map-holder">
        <p>Loading......</p>
        <div id="map"></div>
      </div>
      <form  onSubmit={this.handleSubmit} className="form-group list-group col-xs-12 col-md-6 col-md-offset-3" >
        <label htmlFor="category">Category:</label>
        <DropDown id='category' title={this.state.category} items={['Food', 'Nature', 'Pets', 'Sports', 'Music', 'General']} whenSelected={this.handleCategoryChange} />
        <label htmlFor="location">Location:</label>
        <input type="text" className="form-control" id="location" onChange={this.handleLocationChange} value={this.state.location} placeholder="Location" />
        <label htmlFor="comment">Comment:</label>
        <textarea value={this.state.comment} onChange={this.handleCommentChange} className="form-control" rows="10" id="comment"></textarea>
        <div>
          <input type="submit" className="btn btn-primary" value="Save Breadcrumb" />
        </div>
      </form>
      </div>
    );
  }

});

module.exports = Map;
