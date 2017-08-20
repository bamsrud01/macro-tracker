angular.module('macrotrack')
  .service('AddRecipeService', AddRecipeService);

function AddRecipeService($http) {

  let service = this;

  //  Will contain:
    //  existingRecipe {false}
    //  recipeToEdit {recipe_object}

  //  Post a new food to the database
  service.submitNewRecipe = (recipeData) => {
    console.log('Will POST recipe data:', recipeData);
    return $http({
      method: 'POST',
      url: '/recipe',
      data: recipeData
    }).then(response => {
      console.log('SERVICE received response:', response);
      return response.data;
    });
  }

  //  Update an existing recipe
  service.updateRecipe = (recipeData) => {
    return $http({
      method: 'PUT',
      url: '/recipe',
      data: recipeData
    }).then(response => {
      console.log('SERVICE received response:', response);
      return response.data;
    });
  }

  //  Post an ingredient to the database
  service.submitIngredient = (ingredientData) => {
    console.log('Will POST ingredient data', ingredientData);
    return $http({
      method: 'POST',
      url: '/recipe/ingredient',
      data: ingredientData
    }).then(response => {
      console.log('SERVICE received response:', response);
      return response.data;
    });
  }

}
