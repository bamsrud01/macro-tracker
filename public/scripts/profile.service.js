angular.module('macrotrack')
  .service('ProfileService', ProfileService);

function ProfileService($http) {

  let service = this;

  service.getLogByDate = (userId, dateString) => {
    return $http.get('/profiles/date', {
      params: {
        user_id: userId,
        log_date: dateString
      }
    }).then(response => {
      return response.data;
    });
  }

}
