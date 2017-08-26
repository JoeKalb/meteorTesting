import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

// Accoutns config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

import './main.html';

Template.body.helpers({
  /*
  notes:[
    {text: 'My Note 1'},
    {text: 'My Note 2'},
    {text: 'My Note 3'}
  ]
  */
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

    // Insert note into collections
    /*
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
    */
    Meteor.call('notes.insert', text);
    // Clear form
    target.text.value = '';

    // Close modal
    $('#addModal').modal('close');
    return false;
  }
});

Template.note.events({
  'click .delete-note':function(){
    //Notes.remove(this._id);
    Meteor.call('notes.remove', this);
    return false;
  }
})
