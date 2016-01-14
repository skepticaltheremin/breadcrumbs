var React = require('react');
var EditScreen = require('./EditScreen.jsx');

var EditItem = React.createClass({

	alertMe(){
		console.log('alertme called')
		alert("alertMeCalled")
	  },

  render(){
	return <span>
	<button data-toggle='modal' data-target='#myModal'>{this.props.title}</button>
	<div id="myModal" className="modal fade" role="dialog">
	  <div className="modal-dialog">
	    <div className="modal-content">
	      <div className="modal-header">
	        <button type="button" className="close" data-dismiss="modal">&times;</button>
	        <h4 className="modal-title">Edit Item</h4>
	      </div>
	      <div className="modal-body">
	        <textarea placeholder='Update your note here'></textarea>
	      </div>
	      <div className="modal-footer">
	        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" className="btn btn-default" data-dismiss="modal">Submit</button>
	      </div>
	    </div>
	  </div>
	</div>
    </span>

  }

});

module.exports = EditItem;