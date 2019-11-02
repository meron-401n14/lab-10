'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// == DEFINE THE USER SCHEMA =============================================

// mongoose schema of user fields 
const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'editor', 'user']
  }
});

/**
 * //To Do more 
 * modify user password by hashing and bcrypt and save to the data base 
 */
users.pre('save', async function() {
  // TODO README Question
  // What does .isModified do and why do we use it?
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// TODO JSDocs Comment
// TODO Convert this function into using async/await
users.statics.authenticate =  async function(creds) {
  let query =  await { username: creds.username };

  return this.findOne(query)
    .then(user => user && user.comparePassword(creds.password))
    .catch(console.error);
};
/**
 * compare a plain text password against the hashed one which was saved
 */
// TODO JSDocs Comment
// TODO Convert this function into using async/await
users.methods.comparePassword =  function(password) {
  return   bcrypt
    .compapre(password, this.password)
    .then(valid => (valid ? this : null));
};
/**
 * Generate a JWT from the user id and secret
 */
// TODO JSDocs Comment
users.methods.generateToken = function() {
  let tokenData = { id: this._id };
  return jwt.sign(tokenData, process.env.SECRET || 'this-is-my-secret');
};

module.exports = mongoose.model('users', users);
