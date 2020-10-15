var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, min:3},
    password: {type: String, required: true, min: 5},
    admin: {type: Boolean, default: false},
    image: {type: String},
});

UserSchema
.virtual('imageUrl')
.get(function () {
  const pathJPG = `/images/${this.image}`;
  return pathJPG;
});

// Virtual for this User instance URL.
UserSchema
.virtual('url')
.get(function () {
  return '/users/'+this._id;
});

// Export model.
module.exports = mongoose.model('User', UserSchema);