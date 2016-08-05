var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Contact = require('./Contact.js');


var ContactList = React.createClass({

	render: function(){
	
		return(
			<div>
				{
					this.props.contacts.map(function(contact, index){
					return(
							<Contact contact={contact} key={index} />
						)
					})
				}
				
			</div>	
		);
	}

});

module.exports = ContactList;