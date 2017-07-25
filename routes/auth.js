/*  Handles user login and registration  */

//  Declare router
const router = require('express').Router();

//  Import PostgreSQL
const pg = require('pg');

//  Use 'macrotrack' database
const config = {
  database: 'macrotrack'
};

//  Initialize connection
var pool = new pg.Pool(config);


//  Export router
module.exports = router;
