angular.module('macrotrack')
  .service('AddRecipeService', AddRecipeService);

function AddRecipeService($http) {

  let service = this;

  //  Will contain:
    //  existingRecipe {false}
    //  recipeToEdit {recipe_object}

  //  Post a new food to the database
  service.submitNewRecipe = (recipeData) => {
    console.log('Will POST data:', recipeData);
    return $http({
      method: 'POST',
      url: '/recipe',
      data: recipeData
    }).then(response => {
      console.log('SERVICE received response:', response);
      return response.data;
    });
  }

}
