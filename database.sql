CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(40) NOT NULL,
  password varchar(120) NOT NULL,
  email varchar(80) NOT NULL,
  shared BOOLEAN
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name varchar(40) NOT NULL,
  variety varchar(120),
  brand varchar(120),
  serving varchar(120),
  calories INT,
  carbs INT,
  fiber INT,
  protein INT,
  fat INT,
  user_id INT NOT NULL
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name varchar(120) NOT NULL,
  serving varchar(120),
  calories INT,
  carbs INT,
  fiber INT,
  protein INT,
  fat INT,
  user_id INT NOT NULL,
  directions TEXT NOT NULL
);

-- Check in case foods do not exist.  User should not be forced to create every food.
CREATE TABLE foods_recipes (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  food_id INT
);

CREATE TABLE food_comments (
  id SERIAL PRIMARY KEY,
  food_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL
);

CREATE TABLE recipe_comments (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL
);

-- Weight stored as string to be parsed
CREATE TABLE history (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  log_date TIMESTAMP,
  weight varchar(40),
  calories INT,
  carbs INT,
  protein INT,
  fat INT
);
