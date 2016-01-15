var React = require('react');
var EditItem = React.createClass({

	sendUpdate(){
		this.props.pinObject.details.note = $('.modal-body').children()[0].value;
		this.props.updatePin(this.props.pinObject._id, this.props.pinObject);
	},

  render(){
  	var comment = this.props.pinObject.details ? this.props.pinObject.details.note : '';
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
		        <textarea placeholder={comment}></textarea>
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
		        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.sendUpdate}>Submit</button>
		      </div>
		    </div>
		  </div>
		</div>
	  </span>

  }

});

module.exports = EditItem;
