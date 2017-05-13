//  Declare node modules
const express = require('express');


//  Initialize project
let app = express();

//  Declare port variable
let port = 5000;

//  Start express server
app.listen(port);
console.log('Listening on port ' + port);
