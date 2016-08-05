var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var EditForm = React.createClass({

	render: function(){
	
		return(
			<div className="text-center">
				<h3 className="text-center">Edit contact</h3>
				<form onSubmit={this.handleSubmit} id="editForm"className="center-block">
					<div className="form-group" id="cont">
						<div className="input_label in1"><label></label></div> 
						<input type="text" id="name" ref="name" className="form-control name" onChange={this.handleChange.bind(this, 'name')} value={this.props.contactToEdit.name} placeholder="Enter the name*" required/> 
					</div>
					<div className="form-group" id="cont">
						<div className="input_label in2"><label></label></div>
						<input type="text" ref="phone" className="form-control" onChange={this.handleChange.bind(this, 'phone')} value={this.props.contactToEdit.phone} placeholder="Enter the contact number" /> 
					</div>
					<div className="form-group" id="cont">
						<div className="input_label in3"><label></label></div> 
						<input type="text" ref="email" className="form-control" onChange={this.handleChange.bind(this, 'email')} value={this.props.contactToEdit.email} placeholder="Enter the E-mail address" /> 
					</div>
					<div className="form-group" id="cont">
						<div className="input_label in4"><label></label></div> 
						<input type="text" ref="photo" className="form-control" onChange={this.handleChange.bind(this, 'photo')} value={this.props.contactToEdit.photo} placeholder="Enter the URL for contact image" /> 
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>	
		);
	},

	handleChange: function(fieldName, event){
		var newState = event.target.value;
		var selected = this.state.selected;
		selected.name = newState;
		this.setState({selected: selected});
	},

	handleSubmit: function(e){
		e.preventDefault();

		var contact = {
			id: this.props.contactToEdit.id,
			name:this.refs.name.value.trim(),
			phone:this.refs.phone.value.trim(),
			email:this.refs.email.value.trim(),
			photo:this.refs.photo.value.trim()
		}
		AppActions.updateContact(contact);

		this.props.contactToEdit.name='';
		this.props.contactToEdit.phone='';
		this.props.contactToEdit.email='';
		this.props.contactToEdit.photo='';
	}

});

module.exports = EditForm;