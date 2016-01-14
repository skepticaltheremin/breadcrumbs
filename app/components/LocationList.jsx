var React = require('react');
var LocationItem = require('./LocationItem.jsx');
var DropDown = require('./DropDown.jsx')


var LocationList = React.createClass({

  // getInitialState(){
  //   return {
  //     category: 'All'
  //   }
  // },

  // handleCategoryChange(categoryName) {
  //   this.setState({category: categoryName});
  // },

  render(){

    var self = this;
    var filter = this.props.filter;

    var locations = this.props.locations.map(function(l){
      console.log('category for filter ', l.address, l.category);
      var active = self.props.activeLocationAddress == l.address;


      // Notice that we are passing the onClick callback of this
      // LocationList to each LocationItem.
      if(filter === 'All' || filter === l.category){
      return <LocationItem address={l.address} timestamp={l.timestamp} 
          active={active} onClick={self.props.onClick} />
      }
    });

    if(!locations.length){
      return null;
    }

    return (
      <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
        <span className="list-group-item active">Saved Locations</span>
        {locations}
      </div>
    )

  }

});

module.exports = LocationList;
