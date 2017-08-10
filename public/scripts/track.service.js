angular.module('macrotrack')
  .service('TrackService', TrackService);

function TrackService($http) {

  let service = this;

  //  Post a new profile record
  service.postLog = (logData) => {
    console.log('Will POST new user record:', logData);
    return $http({
      method: 'POST',
      url: '/profiles/date',
      data: logData
    }).then(response => {
      console.log('SERVICE returned response:', response);
      return response.data;
    });
  }

  //  Update an existing profile record
  service.postLog = (logData) => {
    console.log('Will POST new user record:', logData);
    return $http({
      method: 'PUT',
      url: '/profiles/date',
      data: logData
    }).then(response => {
      console.log('SERVICE returned response:', response);
      return response.data;
    });
  }

}
