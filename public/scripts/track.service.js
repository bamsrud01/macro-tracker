angular.module('macrotrack')
  .service('TrackService', TrackService);

function TrackService($http) {

  let service = this;

  //  Get logged items by date
  service.getLoggedItems = (userId, logDate) => {
    return $http.get('/profiles/items', {
      params: {
        user_id: userId,
        log_date: logDate
      }
    }).then(response => {
      return response.data;
    });
  }

  //  Post a new profile record
  service.postLog = (logData, logDate) => {
    logData.log_date = logDate;
    return $http({
      method: 'POST',
      url: '/profiles/date',
      data: logData
    }).then(response => {
      return response.data;
      //  [{ id, calories, carbs, protein, fat, log_date, user_id, weight }]
    });
  }

  //  Update an existing profile record
  service.updateLog = (logData) => {
    return $http({
      method: 'PUT',
      url: '/profiles/date',
      data: logData
    }).then(response => {
      return response.data;
      //  [{ id, calories, carbs, protein, fat, log_date, user_id, weight }]
    });
  }

  //  Update only weight
  service.updateWeight = (logData) => {
    return $http({
      method: 'PUT',
      url: '/profiles/weight',
      data: logData
    }).then(response => {
      return response.data;
      //  [{ id, calories, carbs, protein, fat, log_date, user_id, weight }]
    });
  }

  //  Update all fields
  service.updateAll = (logData) => {
    return $http({
      method: 'PUT',
      url: '/profiles/all',
      data: logData
    }).then(response => {
      return response.data;
      //  [{ id, calories, carbs, protein, fat, log_date, user_id, weight }]
    });
  }

  //  Post a food item in user history
  service.postFoodRecord = (logData) => {
    return $http({
      method: 'POST',
      url: 'profiles/logFood',
      data: logData
    }).then(response => {
      return response.data;
      //  [{ id, user_id, log_id, food_id, amount, log_date }]
    });
  }

  //  Post a recipe item in user history
  service.postRecipeRecord = (logData) => {
    return $http({
      method: 'POST',
      url: 'profiles/logRecipe',
      data: logData
    }).then(response => {
      return response.data;
      //  [{ id, user_id, log_id, recipe_id, amount, log_date }]
    });
  }

  //  Delete an item record
  service.deleteItemRecord = (itemId) => {
    return $http.delete('/profiles/item', {
      params: {
        itemId
      }
    }).then(response => {
      console.log('SERVICE returned response:', response);
      return;
    });
  }

}
