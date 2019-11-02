'use strict';

const express = require('express');
const router = express.Router();

const Users = require('../models/users-model.js');
const users = new Users();


/**
 * create user with all user information
 * @param {*} req user && user_id
 * @param {*} res 
 * @param {*} next 
 */
const create = async (req, res, next) => {
  let user = await users.create(req.body);
  req.user = user && user._id ? user : null;

  next();
};
/**
 * auhenticate user based on the user information 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const authenticate = async (req, res, next) => {
  let user = await users.authenticate(req.body);
  req.user = user && user._id ? user : null;

  next();
};

// TODO README Question
// Currently, the client is just sending us an object
// containing the username and password to us, which is
// why we can just pass along (req.body). What is a
// better way to do this?

const setToken = (req, res, next) => {
  if (req.user) {
    let token = req.user.generateToken();

  
    // set generated token to the user
    res.set('token', token);

    // setting token cookie 
    // TODO README Question
    // What are the pros and cons of setting res.cookie?

    res.cookie('token', token);

    res.send('Successfully authenticated and logged in');
  } else res.send('Unable to authenticate and log in');
};
/**
 * @swagger
 * /signup
 * post:
 * description: create a new user 
 */

router.post('/signup', create, setToken);

/**
 * @swagger
 * /signin
 * post:
 * description: sign in a user
 */
router.post('/signin', authenticate, setToken);

module.exports = router;
