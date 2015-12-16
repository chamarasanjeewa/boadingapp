// ./models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   
    userName: String,
    email:String,
    passwordHash: String,
    passwordSalt: String,
    createdDate : Date,
    updatedDate:Date
});
var User=mongoose.model('user', UserSchema);
module.exports = User;

UserSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updatedDate = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdDate)
    this.createdDate = currentDate;

  next();
});