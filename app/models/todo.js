var mongoose = require('mongoose');

var purchasedGood = mongoose.model('purchasedgood', {
    text : {type : String, default: ''},
    amount: Number,// 	userId:{type : String, default: ''},
    createdDate    : Date,
    modifiedDate :Date,
    userId:Number,
    purchasedDate:Date//,
  //  userId:{type: Schema.Types.ObjectId, ref: 'user'}

});
 module.exports=purchasedGood;