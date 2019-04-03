const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var workshopSchema = mongoose.Schema({
  theme: String,
  description: String,
  presenter: String,
  attendees: [{name: String, email: String, code: String}],
  type: String,
  capacity: {type: Number, default: 40},
  presenterPhoto: String
})

mongoose.model('Workshop', workshopSchema);
