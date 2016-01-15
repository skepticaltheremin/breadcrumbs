var React = require('react');
var EditItem = React.createClass({

	
  render(){
  	console.log("Edit Item called!", this.props.pinObject);
	return <span>
	<div id="myModal" className="modal fade" role="dialog">
	  <div className="modal-dialog">
	    <div className="modal-content">
	      <div className="modal-header">
	        <button type="button" className="close" data-dismiss="modal">&times;</button>
	        <h4 className="modal-title">Edit Your Breadcrumb</h4>
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