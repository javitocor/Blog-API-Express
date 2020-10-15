var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, min:3},
    password: {type: String, required: true, min: 5},
    admin: {type: Boolean, default: false},
    image: {type: String},
});

UserSchema.pre('remove', function(next) {
  this.model('Post').deleteMany({ author_id: this._id });
  this.model('Comment').deleteMany({ author_id: this._id });
  next();
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

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