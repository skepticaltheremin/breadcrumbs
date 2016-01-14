var React = require('react');
var moment = require('moment');
var EditItem = require('./EditItem.jsx');

var LocationItem = React.createClass({

  handleClick(){
    this.props.onClick(this.props.address, null, true);
  },

  render(){

    var cn = "list-group-item";

    if(this.props.active){
      cn += " active-location";
    }

    return (
      <span className={cn}>
      <a onClick={this.handleClick}>
        {this.props.details.note}
        <span>{this.props.address}</span>
        <span className="createdAt">{ moment(this.props.timestamp).fromNow() }</span>
        
      </a>
      <EditItem title="EDIT" />
      </span>
    )

  }

});

module.exports = LocationItem;
