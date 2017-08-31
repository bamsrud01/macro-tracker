/*  Handles user login and registration  */

//  Declare router
const router = require('express').Router();

//  Import user registration
const User = require('../models/user');

//  Import passport
const passport = require('passport');

//  Import pool from connection.js
const pool = require('../db/connection');

/*  GET requests  */

//  Register a new user
router.post('/', function(req, res) {
  const { username, password, email, shared } = req.body;
  console.log('Registering a new user');
  User.createUser({username, password, email, shared}).then(function() {
    res.sendStatus(201);
  }).catch(function(err) {
    console.log('Error in /register:', err);
    res.sendStatus(500);
  });
});

/*  POST requests  */

/*  PUT requests  */

/*  DELETE requests  */

//  Export router
module.exports = router;
