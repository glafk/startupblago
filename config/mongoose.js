const config = require('./config');
const mongoose = require('mongoose');
var Attendee = require('../models/Attendee');
var Workshop = require('../models/Workshop');
var Code = require('../models/Code');

module.exports = function (config) {
	mongoose.connect(config.db, {useNewUrlParser: true});
  var db = mongoose.connection;

    db.on('connected', function(err) {
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
