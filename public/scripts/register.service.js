angular.module('macrotrack')
  .service('RegisterService', RegisterService);

function RegisterService($http, $location) {

  let service = this;

  service.submitUser = userData => {
    console.log('Registering user');
    return $http({
      method: 'POST',
      url: '/auth',
      data: userData
    }).then(() => {
      $location.path('/home');
    }, error => {
      console.log('Error with registration:', error);
    });
  }

}
