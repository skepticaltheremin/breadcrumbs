var React = require('react');
var moment = require('moment');
var EditItem = require('./EditItem.jsx');

var LocationItem = React.createClass({

  handleClick(){
    this.props.onClick(this.props.address, null, true);
  },

  // editClick is a wrapper for the parent, LocationList (function is called 'edit')
  editClick(){
    this.props.edit(this.props.pin);
  },

  render(){

    var cn = "list-group-item";

    if(this.props.active){
      cn += " active-location";
    }

    return (
      <span className={cn}>
      <a onClick={this.handleClick}>
        <span>{this.props.details.note}</span>
        <span>{this.props.address}</span>
        <span className="createdAt">{ moment(this.props.timestamp).fromNow() }</span>
      </a>
        <button onClick={this.editClick} className='btn btn-primary glyphicon-menu-right' data-toggle='modal' data-target='#myModal'>{this.props.title}</button>
      </span>
    )

  }

});

module.exports = LocationItem;
