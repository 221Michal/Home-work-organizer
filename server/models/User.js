const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;
const { salt } = require('../config/config')

const UserSchema = new Schema({
  email: String,
  username: String,
  hash: String,
});

UserSchema.methods.setEmail = function(email) {
  this.email = email;
};
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
    userId:  this._id,
  }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
  return {
    userId:  this._id,
    username: this.username,
  };
};

module.exports = mongoose.model('User', UserSchema);