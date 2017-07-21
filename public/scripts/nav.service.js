angular.module('macrotrack')
  .service('NavService', NavService);

//  Handle moving data between controllers
function NavService() {

  let service = this;

  //  Global state of app
  //  TEMPORARY STATE:  { logginIn: true, username: TESTUSER, user_id: 1000 }
  //  Reset to { loggedIn: false, username: false, user_id: false }
  service.state = {
    loggedIn: true,
    username: TESTUSER,
    user_id: 1000
  }

}
