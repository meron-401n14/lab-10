'use strict';

const express = require('express');
const router = express.Router();

const Users = require('../models/users-model.js');
const users = new Users();


/**
 * create user with all user information
 * @param {object} req user && user_id(req.body & req.param.id)
 * @param {object} res 
 * @param {function} next go to next middleware authenticate 
 */
const create = async (req, res, next) => {
  let user = await users.create(req.body);
  req.user = user && user._id ? user : null;

  next();
};
/**
 * auhenticate user based on the user information 
 * @param {object} req .request for req.body req.parm.id of a user to authenticate if user it authenticate
 * @param {object} res 
 * @param {function} next middleware after authenticate may be setToken
 */

const authenticate = async (req, res, next) => {
  let user = await users.authenticate(req.body);
  req.user = user && user._id ? user : null;

  next();
};
const setToken = (req, res, next) => {
  if (req.user) {
    let token = req.user.generateToken();
    // set generated token and store it in the response header
    res.set('token', token);
    // store token as a cookie 
    res.cookie('token', token);
    res.send('Successfully authenticated and logged in');
  } else res.send('Unable to authenticate and log in');
};

/**
 *@route POST /signup
 *@param {function} create a function which create a user
 *@param {function} setToken once a user is created a function setToken does set a Token for that user 
*/
router.post('/signup', create, setToken);

/**
 * @route POST /signin 
 * @param {function} authenticate . this route run a function authenticate a user who signin 
 * @param {function} setToken . run this function to generateToken, then store it in the response header 
 */
router.post('/signin', authenticate, setToken);
module.exports = router;
 




  

 



