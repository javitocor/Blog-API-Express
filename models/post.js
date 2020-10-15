var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, required: true, min: 3, max: 20},
    text: {type: String, required: true, min: 5, max: 250},
    author: {type: Schema.ObjectId, ref: 'User', required: true},
    isPublished: {type: Boolean, default: false},
    timestamp: {type : Date, default: Date.now },
});

PostSchema.pre('remove', function(next) {
  this.model('Comment').deleteMany({ post: this._id }, next);
});

// Virtual for this Post instance URL.
PostSchema
.virtual('url')
.get(function () {
  return '/posts/'+this._id;
});

PostSchema
.virtual('timestamp_formatted')
.get(function () {
  return moment(this.timestamp).format('MMMM Do YYYY, h:mm:ss a');
});

// Export model.
module.exports = mongoose.model('Post', PostSchema);