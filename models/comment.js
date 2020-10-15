var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    text: {type: String, required: true, min: 5, max: 250},
    author: {type: Schema.ObjectId, ref: 'User', required: true},
    timestamp: {type : Date, default: Date.now },
});

CommentSchema
.virtual('timestamp_formatted')
.get(function () {
  return moment(this.timestamp).format('MMMM Do YYYY, h:mm:ss a');
});

// Export model.
module.exports = mongoose.model('Comment', CommentSchema);