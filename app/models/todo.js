var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text : {type : String, default: ''},
	amount: Number,
	 date    : Date
});

module.exports = mongoose.model('Users', {
	username : {type : String, default: ''},
	password: {type : String, default: ''},
	createdDate    : Date,
    updatedDate:Date
});

module.exports = mongoose.model('purchased', {
	text : {type : String, default: ''},
	amount: Number,
	createddate    : Date,
	 updatedddate    : Date
});