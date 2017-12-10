import { Template } from 'meteor/templating';
import { Notes } from '../lib/collection.js';
import { Accounts } from 'meteor/accounts-base';

import './main.html';


// Accounts config

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

Template.body.helpers({

  notes(){
    return Notes.find({});
  }
});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();

    // Get input value
    const target = event.target;
    const text = target.text.value;

    Meteor.call('notes.insert', text);

    // Clear form
    target.text.value = '';
    // Close modal
    $('#addModal').modal('close');
    return false;
  }
});

Template.note.events({
  'click .delete-note': function(){
    // Notes.remove(this._id);
    Meteor.call('notes.remove', this);
    return false;
  }
})