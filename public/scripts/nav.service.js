angular.module('macrotrack')
  .service('NavService', NavService);

//  Handle moving data between controllers
function NavService() {

  let service = this;

  //  Global state of app
  service.state = {
    loggedIn: false,
    username: false,
    user_id: false
  }

}
