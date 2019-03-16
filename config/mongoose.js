const config = require('./config');
const mongoose = require('mongoose');
var Attendee = require('../models/Attendee');
var Workshop = require('../models/Workshop');
var Code = require('../models/Code');
var Presenter = require('../models/Presenter');

module.exports = function (config) {
	mongoose.connect(config.db);
  var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });
}
