// Handle CRUD of recipe objects

//  Declare file as a router
const router = require('express').Router();

//  Import PostgreSQL
const pg = require('pg');

//  Use 'macrotrack' database
let config = {
  database: 'macrotrack'
}

//  Initialize connection pool
let pool = new pg.Pool(config);

//  Export router
module.exports = router;
