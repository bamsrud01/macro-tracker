angular.module('macrotrack')
  .service('RegisterService', RegisterService);

function RegisterService($http) {

  let service = this;

  //  Check if username is unique
  service.uniqueUsername = (username) => {
    return $http.get('/auth/unique', {
      params: {
        username: username
      }
    }).then((response) => {
      return response.data;
    });
  }

}
