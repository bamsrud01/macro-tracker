// Handle CRUD of comments on foods and recipes

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

//  POST comment on foods
//  Accepts { foodId, userId, commentDate, comment }
router.post('/food', function(req, res) {
  let foodData = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err){
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO food_comments ' +
      '(food_id, user_id, comment_date, comment) ' +
      'VALUES ($1, $2, $3, $4) RETURNING *;',
      [foodData.foodId, foodData.userId, foodData.commentDate, foodData.comment],
      function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  POST comment on recipes
//  Accepts { recipeId, userId, commentDate, comment }
router.post('/recipe', function(req, res) {
  let recipeData = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err){
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO recipe_comments ' +
      '(recipe_id, user_id, comment_date, comment) ' +
      'VALUES ($1, $2, $3, $4) RETURNING *;',
      [recipeData.recipeId, recipeData.userId, recipeData.commentDate,
      recipeData.comment], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  POST comment on profiles
//  Accepts { profileId, userId, commentDate, comment }
router.post('/profile', function(req, res) {
  let profileData = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err){
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO profile_comments ' +
      '(profile_user_id, user_id, comment_date, comment) ' +
      'VALUES ($1, $2, $3, $4) RETURNING *;',
      [profileData.profileId, profileData.userId, profileData.commentDate,
      profileData.comment], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

// GET comments on foods
//  Returns [{ id, food_id, user_id, comment_date, comment }]
router.get('/food', function(req, res) {
  let foodId = req.query.foodId;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM food_comments WHERE food_id=$1;',
      [foodId], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

// GET comments on recipes
//  Returns [{ id, recipe_id, user_id, comment_date, comment }]
router.get('/food', function(req, res) {
  let recipeId = req.query.recipeId;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM recipe_comments WHERE recipe_id=$1;',
      [recipeId], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

// GET comments on profiles
//  Returns [{ id, profile_user_id, user_id, comment_date, comment }]
router.get('/profile', function(req, res) {
  let profileId = req.query.profileId;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM profile_comments WHERE profile_user_id=$1;',
      [profileId], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  PUT comments on foods
//  Accepts { id, commentDate, comment }
router.post('/food', function(req, res) {
  let foodData = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE food_comments SET ' +
      'comment_date=$1, comment=$2 ' +
      'WHERE id=$3 RETURNING *;', [foodData.commentDate, foodData.comment,
      foodData.id], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  PUT comments on recipes
//  Accepts { id, commentDate, comment }
router.post('/recipe', function(req, res) {
  let recipeData = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE recipe_comments SET ' +
      'comment_date=$1, comment=$2 ' +
      'WHERE id=$3 RETURNING *;', [recipeData.commentDate, recipeData.comment,
      recipeData.id], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  PUT comments on profiles
//  Accepts { id, commentDate, comment }
router.post('/profile', function(req, res) {
  let profileData = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE profile_comments SET ' +
      'comment_date=$1, comment=$2 ' +
      'WHERE id=$3 RETURNING *;', [profileData.commentDate, profileData.comment,
      profileData.id], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  DELETE comments on foods
//  Accepts { id }
router.delete('/food', function(req, res) {
  let commentId = req.body.id;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM food_comments ' +
      'WHERE id=$1', [commentId], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Deleted comment');
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

//  DELETE comments on recipes
//  Accepts { id }
router.delete('/recipe', function(req, res) {
  let commentId = req.body.id;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM recipe_comments ' +
      'WHERE id=$1', [commentId], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Deleted comment');
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

//  DELETE comments on profiles
//  Accepts { id }
router.delete('/profile', function(req, res) {
  let commentId = req.body.id;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM profile_comments ' +
      'WHERE id=$1', [commentId], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Deleted comment');
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});


//  Export router
module.exports = router;
