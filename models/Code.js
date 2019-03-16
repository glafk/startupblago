const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var codeSchema = mongoose.Schema({
  code: String
})

mongoose.model('Code', codeSchema);
