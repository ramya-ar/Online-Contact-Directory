var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');
var AddForm = require('../components/AddForm.js');

var CHANGE_EVENT = 'change';

var _contacts = [];
var _contact_to_edit = ''; 

var AppStore = assign({}, EventEmitter.prototype, {
	getContacts: function(){
		return _contacts;
	},
	saveContact: function(contact){
		_contacts.push(contact);
	},
	setContacts: function(contacts){
		_contacts = contacts;
	},
	removeContact: function(contactId){
		var index = _contacts.findIndex(x => x.id === contactId);
		_contacts.splice(index, 1);
	},
	setContactToEdit: function(contact){
		_contact_to_edit = contact;
	},
	removeChangeListener: function(callback){
		this.removeListener('change',callback);
	},
	getContactToEdit: function(){
		return _contact_to_edit;
	},
	updateContact: function(contact){
		for(i=0;i<_contacts.length;i++){
			if(_contacts[i].id == contact.id){
				_contacts.splice(i,1);
				_contacts.push(contact);
			}
		}
	},
	emitChange : function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change', callback);
	}
	
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case AppConstants.SAVE_CONTACT:
			 console.log('Saving contact...');

			//store save
			AppStore.saveContact(action.contact);

			//save to API
			AppAPI.saveContact(action.contact);

			//Emit change
			AppStore.emit(CHANGE_EVENT);
		break;

			case AppConstants.REMOVE_CONTACT:
				console.log('Removing contacts...');

				//store save
				AppStore.removeContact(action.contactId);

				//API remove
				AppAPI.removeContact(action.contactId);

				//Emit change
				AppStore.emit(CHANGE_EVENT);
			break;

			case AppConstants.RECEIVE_CONTACTS:
				console.log('Receiving contacts...');

				//store save
				AppStore.setContacts(action.contacts);

				//Emit change
				AppStore.emit(CHANGE_EVENT);
			break;

			case AppConstants.EDIT_CONTACT:

				//store save
				AppStore.setContactToEdit(action.contact);

				//Emit change
				AppStore.emit(CHANGE_EVENT);
			break;

			case AppConstants.UPDATE_CONTACT:
				console.log('Updating contacts...');

				//store save
				AppStore.updateContact(action.contact);

				//API update
				AppAPI.updateContact(action.contact);

				//Emit change
				AppStore.emit(CHANGE_EVENT);
			break;
}
	return true;
});

module.exports = AppStore;