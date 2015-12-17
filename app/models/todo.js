var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchasedGoodSchema=new Schema({
    text : {type : String, default: ''},
    amount: Number,// 	userId:{type : String, default: ''},
    createdDate    : Date,
    modifiedDate :Date,
    userProfileId:{type: Schema.Types.ObjectId, ref: 'userprofile'},
    purchasedDate:Date//,

})

var UserProfile=mongoose.model('purchasedgood', PurchasedGoodSchema);
module.exports = UserProfile;
