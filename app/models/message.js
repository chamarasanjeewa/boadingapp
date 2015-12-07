var mongoose = require('mongoose');

module.exports = mongoose.model('message', {
	from : {type : String, default: ''},
	to: {type : String, default: ''},
	message: {type : String, default: ''},
	createdDate    : Date,
    updatedDate:Date
});

