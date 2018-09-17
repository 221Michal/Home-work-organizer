const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;
const { salt } = require('../config/config')

const UserSchema = new Schema({
  username: String,
  hash: String,
  token: String,
});

UserSchema.methods.setName = function(username) {
  this.username = username;
};
UserSchema.methods.setPassword = function(password) {
  this.hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
  };
};

// mongoose.model('xyz', UserSchema);
module.exports = mongoose.model('User', UserSchema);