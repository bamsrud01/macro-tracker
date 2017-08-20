angular.module('macrotrack')
  .service('ProfileService', ProfileService);

function ProfileService($http) {

  let service = this;

  service.getLogByDate = (userId, dateString) => {
    const logSearch = {
      user_id: userId,
      log_date: dateString
    };
    return $http.get('/profiles/date',{
      params: {
        user_id: userId,
        log_date: dateString
      }
    }).then(response => {
      return response.data;
    });
  }

}
