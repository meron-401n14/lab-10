'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// == DEFINE THE USER SCHEMA =============================================

// mongoose schema of users 
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
 * pre mongoDB middleware
 * right before save a record, run this code
 * bcrypt.hash password
 */
 
users.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
 
/**
 * @param creds is the object containing all the credentials for this user
 * return single record 
 * compare thier user password with the stored password 
 */
// TODO Convert this function into using async/await
users.statics.authenticate =  async function(creds) {
  let query =  await { username: creds.username };

  return this.findOne(query)
    .then(user => user && user.comparePassword(creds.password))
    .catch(console.error);
};
/**
 * @param password 
 * compare password with the sotred password 
 * bcrypt.compare(password, hashpassword)
 */
// TODO Convert this function into using async/await
users.methods.comparePassword =  function(password) {
  return   bcrypt
    .compapre(password, this.password)
    .then(valid => (valid ? this : null));
};

/**
 * an individual record 
 * @returns tokenData 
 * return generated a JWT(token)
 */
users.methods.generateToken = function() {
  let tokenData = { id: this._id };
  return jwt.sign(tokenData, process.env.SECRET || 'this-is-my-secret');
};

module.exports = mongoose.model('users', users);


