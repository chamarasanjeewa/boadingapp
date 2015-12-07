var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text : {type : String, default: ''},
	amount: Number,
	userId:{type : String, default: ''},
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
	userId:{type : String, default: ''},
	 date    : Date
});