angular.module('macrotrack')
  .service('MainService', MainService);

//  Handle registration, login, logout, redirect
function MainService($http, $location) {

  let service = this;

  //  Holds state object:
  //  service.state = { loggedIn, username, user_id }
  //  service.selectedUserId = id

  service.getUsernameById = (id) => {
    console.log('FILL ME IN!');
    return 'PLACEHOLDER USERNAME';
  }

}
