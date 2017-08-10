angular.module('macrotrack')
  .service('ProfileService', ProfileService);

function ProfileService($http) {

  let service = this;

  service.getLogByDate = (userId, dateString) => {
    const logSearch = {
      user_id: userId,
      log_date: dateString
    };
    console.log('Searching by:', logSearch);
    return $http.get('/profiles/date',{
      params: {
        user_id: userId,
        log_date: dateString
      }
    }).then(response => {
      console.log('SERVICE returned response:', response);
      return response.data;
    });
  }

}
