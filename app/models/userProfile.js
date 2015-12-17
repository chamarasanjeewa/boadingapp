
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserProfileSchema = new Schema({

    firstName: String,
    lastName:String,
    email: String,
    phoneNumber: String,
    createdDate : Date,
    updatedDate:Date,
    user:{type: Schema.Types.ObjectId, ref: 'user'}
});
var UserProfile=mongoose.model('userprofile', UserProfileSchema);
module.exports = UserProfile;
