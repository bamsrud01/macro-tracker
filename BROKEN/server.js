//  Declare node modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//  Initialize project
let app = express();

//  Declare middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

//  Set up public connection
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

//  Declare port variable
let port = process.env.PORT || 5000;

//  Start express server
let server = app.listen(port, function() {
  console.log('Listening on port ' + server.address().port);
});
