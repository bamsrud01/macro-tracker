//  Imports
const bcrypt = require('bcrypt');
const pool = require ('../db/connection');

//  Set variables
const SALT_ROUNDS = 10;

//  Find by username
function findByUsername(username) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      if (err) {
        done();
        return reject(err);
      }
      client.query('SELECT * FROM users WHERE username=$1',
      [username], function(err, result) {
        done();
        if (err) {
          reject(err);
        }
        resolve(result.rows[0]);
      });
    });
  });
}

//  Find by ID
function findById(id) {
  return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done) {
      if (err) {
        done();
        return reject(err);
      }
      client.query('SELECT * FROM users WHERE id=$1',
      [id],
      function(err, result) {
        done();
        if (err) {
          reject(err);
        }
        resolve(result.rows[0]);
      });
    });
  });
}

//  Create a new user
function createUser(userData) {
  let { username, password, email, shared, calories, carbs, protein, fat } = userData;
  if (calories != undefined) {

  }
  if ()
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, SALT_ROUNDS, function(err, hash){
      if (err) {
        console.log('Error hashing password', err);
        return reject(err);
      }
      pool.connect(function(err, client, done) {
        if (err) {
          done();
          return reject(err);
        }
        client.query('INSERT INTO users ' +
        '(username, password, email, shared, calories, carbs, protein, fat) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
          [username, password, email, shared, calories, carbs, protein, fat],
          function(err, result) {
            done();
            if (err) {
              return reject(err);
            }

            resolve(result.rows[0]);
          });
      });
    });
  });
}

//  Compare password
function comparePassword(user, passwordToCompare) {
  return new Promise(function(resolve){
    bcrypt.compare(passwordToCompare, user.password, function(err, match) {
      if (err) {
        console.log('Error comparing password', err);
        return resolve(false);
      }

      resolve(match);
    });
  });
}

//  Export functions
module.exports = {
  findByUsername: findByUsername,
  findById: findById,
  createUser: createUser,
  comparePassword: comparePassword
};
