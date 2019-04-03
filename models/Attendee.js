const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var attendeeSchema = mongoose.Schema({
  name: String,
  email: String,
  code: String
})

attendeeSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'The e-mail field cannot be empty.')

mongoose.model('Attendee', attendeeSchema);
