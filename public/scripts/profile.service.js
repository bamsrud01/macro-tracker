angular.module('macrotrack')
  .service('ProfileService', ProfileService);

function ProfileService($http) {

  let service = this;

  //  Get all user logs for a certain date
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

  //  Get all user logs for all dates
  service.getAllLogs = (userId) => {
    return $http.get('/profiles', {
      params: {
        user_id: userId
      }
    }).then(response => {
      return response.data;
    });
  }

}
