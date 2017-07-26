angular.module('macrotrack', ['ngRoute']);

angular.module('macrotrack')
  .controller('MainController', MainController);

//  Parent of all controllers.  Uses MainService to move data between pages
//  Handles login on the main navbar
function MainController(MainService) {

  let main = this;


  //  Global state of app
  //  TEMPORARY STATE:  { logginIn: true, username: TESTUSER, user_id: 1000 }
  //  Reset to { loggedIn: false, username: false, user_id: false }
  //  Must assign whenever state is changed
  MainService.state = {
    loggedIn: true,
    username: 'TESTUSER',
    user_id: 1000
  }

}
