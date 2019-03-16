const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var presenterSchema = mongoose.Schema({
  name: String,
  description: String
});

mongoose.model('Presenter', presenterSchema);
