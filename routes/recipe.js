/*  Handle CRUD of recipes  */

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

/*  GET requests  */

//  All recipes
router.get('/', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM recipes ORDER BY name', function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from "foods":', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  Get recipe by id
router.get('/byId', function(req, res) {
  const { id } = req.query;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM recipes WHERE id=$1',
      [id], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

/*  POST requests  */

//  Post a new recipe
router.post('/', function(req, res) {
  const { name, serving, calories, carbs, fiber, protein, fat, directions, source, source_url, user_id} = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO recipes (name, serving, calories, carbs, fiber, protein, fat, directions, source, source_url, user_id) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [name, serving, calories, carbs, fiber, protein, fat, directions, source, source_url, user_id],
      function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Returning rows:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  Post ingredients for recipes
router.post('/ingredient', function(req, res) {
  const { recipe_id, food_name, food_amount } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO foods_recipes (recipe_id, food_name, food_amount) ' +
      'VALUES ($1, $2, $3) RETURNING *',
      [recipe_id, food_name, food_amount],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Returning rows:', result.rows);
        res.send(result.rows);  //  Or status code
      });
    } finally {
      done();
    }
  });
});

/*  PUT requests  */

//  Update a recipe (UNTESTED)
router.put('/', function(req, res) {
  const {  } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('',
      [],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Returning rows:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  Update ingredients for recipes (UNTESTED)
router.put('/ingredient', function(req, res) {
  const { id, name, variety, brand, serving, calories, carbs, fiber, protein, fat } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('',
      [],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Returning rows:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

/*  DELETE requests  */

//  Delete a recipe (UNTESTED)
router.delete('/', function(req, res) {
  const recipeId = req.query.recipeId;  //  Change as required
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM recipes WHERE id=$1', [recipeId],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Deleted food');
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

//  Delete an ingredient (UNTESTED)
router.delete('/ingredient', function(req, res) {
  const ingredientId = req.query.ingredientId;  //  Change as required
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM foods_recipes WHERE id=$1', [ingredientId],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Deleted food');
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

//  Export router
module.exports = router;
