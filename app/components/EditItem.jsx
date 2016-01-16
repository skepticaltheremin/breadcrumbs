var React = require('react');
var DropDown = require('./DropDown.jsx');
var EditItem = React.createClass({

	getInitialState() {
		return {
			cat: 'General',
			comment: '',
      catChanged: false,
      commentChange: false
		};
	},

	handleCategoryChange(newCat) {
    debugger;
		this.setState({
      cat: newCat,
      catChanged: true
    });
	},

	handleCommentChange(event) {
		this.setState({
      comment: event.target.value,
      commentChanged: true
    });
	},

	sendUpdate(){
    var prev = prev ? prev : '';
    if( this.state.catChanged ) {
      prev = this.props.pinObject.category;
      this.props.pinObject.category = this.state.cat;
    }
    if ( this.state.commentChanged ) {
      this.props.pinObject.details.note = this.state.comment;
      this.setState({commentChanged: false});
      // debugger;
      $('.modal-body').children('textarea').val('');
    }
    this.props.updatePin(this.props.pinObject._id, this.props.pinObject);
    if (this.state.catChanged) {
      // debugger;
      this.props.pinObject.category = prev;
      this.setState({catChanged: false});
    }
	},

  render(){

    var comment = this.props.pinObject.details ? this.props.pinObject.details.note : this.state.comment;
    var category = this.props.pinObject.category ? this.props.pinObject.category : this.state.cat;
    if (this.refs.somethingElse && (!this.state.catChanged)) {
      this.refs.somethingElse.editUpdate(category);
    }
    console.log(category);
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
		        <DropDown id='category' ref='somethingElse' title={category} items={['Food', 'Nature', 'Pets', 'Sports', 'Music', 'General']} whenSelected={this.handleCategoryChange} />
		        <textarea placeholder={comment} onChange={this.handleCommentChange} style={{marginTop:'10px'}}></textarea>
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
