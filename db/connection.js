//  Import PostgreSQL
const pg = require('pg');

//  Set database
var config = {
  database: 'macrotrack'
};

//  Set connection pool
var pool = new pg.Pool(config);

//  Export file
module.exports = pool;
