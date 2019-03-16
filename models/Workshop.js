const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var workshopSchema = mongoose.Schema({
  theme: String,
  description: String,
  presenter: {type: Schema.Types.ObjectId, ref: 'Presenter'},
  attendees: [String]
})

workshopSchema.methods.addAttendee = function(code, callback){
  this.attendees.push(code);
  this.save(function (err){
		if(err){
			callback(false);
		}
		else {
			callback(true);
		}
	});
}

workshopSchema.methods.removeAttendee = function (code, callback) {
	var indexOfAttendee = this.attendees.indexOf(code);
	if(indexOfAttendee > -1){
		this.attendees.splice(indexOfAttendee, 1);
		this.save(function (err){
			if(err){
				callback(false);
			}
			else {
				callback(true);
			}
		});
	}
	else callback(false);
}

mongoose.model('Workshop', workshopSchema);
