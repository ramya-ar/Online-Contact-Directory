var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var Contact = React.createClass({

	render: function(){
	
		return(
		<div className="col-sm-6 col-md-4">
			<div className="thumbnail">
				<div className="photo"><img src={this.props.contact.photo} height="100" width="100" className="img-responsive img-circle center-block"/></div>
				<div className="caption">
				<h3 className="text-center">{this.props.contact.name}</h3>
				<ul className="list-group">
					<li className="list-group-item"><strong>Contact Number:</strong> {this.props.contact.phone}</li>
					<li className="list-group-item"><strong>Email Address:</strong> {this.props.contact.email}</li>
					<li className="list-group-item text-center"><a href="#" className="btn btn-info" onClick={this.handleEdit.bind(this, this.props.contact)}>Edit</a> <a href="#" className="btn btn-danger" onClick={this.handleRemove.bind(this, this.props.contact.id)}>Remove</a></li>
				</ul>
				</div>
				</div>
			</div>	
		);
	},
	handleRemove: function(i,j){
		AppActions.removeContact(i);
	},

	handleEdit: function(i,j){
		AppActions.editContact(i);
	}

	});

module.exports = Contact;