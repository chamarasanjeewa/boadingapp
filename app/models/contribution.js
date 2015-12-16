var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContributionSchema = new Schema({

    userId: Number,
    amount:Number,
    createdDate : Date,
    updatedDate:Date
});
var ContributionSchema=mongoose.model('contribution', ContributionSchema);
module.exports = ContributionSchema;