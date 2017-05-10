//  Imported dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const connection = require('./db/connection');
// const auth = require('./auth/setup');
// const passport = require('passport');
// const session = require('express-session');
// require('dotenv').config();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,  //  dotenv
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: false
  }
};

// connection.connect();
// auth.setup();

//  Start express
const app = express();

//  Middleware
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//  Create routes

//  Connect routes

//  Declare port
var port = process.env.PORT || 5000;

//  Ensure authentication
