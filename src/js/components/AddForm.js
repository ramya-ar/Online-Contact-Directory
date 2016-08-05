var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var App = require('../components/App.js');
var AppAPI = require('../utils/appAPI.js');


var AddForm = React.createClass({

	render: function(){
	
		return(
			<div className="text-center">
				<h3 className="text-center">Add contact</h3>
				<form onSubmit={this.handleSubmit} id="editForm"className="center-block">
					<div className="form-group" id="cont">
						<div className="input_label in1"><label></label></div> 
						<input type="text" id="name" ref="name" className="form-control name" placeholder="Enter the name*" required/> 
					</div>
					<div className="form-group" id="cont">
						<div className="input_label in2"><label></label></div>
						<input type="text" ref="phone" className="form-control" placeholder="Enter the contact number" /> 
					</div>
					<div className="form-group" id="cont">
						<div className="input_label in3"><label></label></div> 
						<input type="text" ref="email" className="form-control" placeholder="Enter the E-mail address" /> 
					</div>
					<div className="form-group" id="cont">
						<div className="input_label in4"><label></label></div> 
						<input type="text" ref="photo" className="form-control" placeholder="Enter the URL for contact image" /> 
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>	
		);
	},

	handleSubmit: function(e){
		e.preventDefault();

		var contact = {
			name:this.refs.name.value.trim(),
			phone:this.refs.phone.value.trim(),
			email:this.refs.email.value.trim(),
			photo: this.refs.photo.value.trim()
		}

		if(contact.name==''){
			alert('please enter name');
		}
		else{
		AppActions.saveContact(contact);
		AppAPI.getContacts();
        document.getElementById("editForm").reset();
    }
	}
});

module.exports = AddForm;