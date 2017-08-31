//  Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./db/connection');
const auth = require('./auth/setup');
const passport = require('passport');
const session = require('express-session');
//  require('dotenv').config(); //  Wait until sure about purpose

//  Set up
connection.connect();
auth.setup();

//  Declare Express app
const app = express();

//  Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

//  Create routes
const authRoute = require('./routes/auth');
const comment = require('./routes/comment');
const food = require('./routes/food');
const profiles = require('./routes/profiles');
const recipe = require('./routes/recipe');

//  Connect routes
app.use('/auth', authRoute);
app.use('/comment', comment);
app.use('/food', food);
app.use('/profiles', profiles);
app.use('/recipe', recipe);

//  Declare port variable
let port = process.env.PORT || 5000;

/*  Authentication required beyond this point  */

//  Ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use(ensureAuthenticated);

//  Set up public connection
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

//  Start express server
let server = app.listen(port, function() {
  console.log('Listening on port ' + server.address().port);
});
