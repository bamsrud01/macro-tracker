angular.module('macrotrack')
  .service('RecipeService', RecipeService);

function RecipeService($http) {

  let service = this;

  //  Get all recipes in database
  service.getAllRecipes = () => {
    return $http.get('/recipe').then(response => {
      console.log('SERVICE recieved response:', response);
      return response.data;
    });
  }

  //  Get a specific recipe by id
  service.getOneRecipe = (recipeId) => {
    return $http.get('/recipe/byId', {
      params: {
        id: recipeId
      }
    }).then(response => {
      return response.data;
    });
  }

}
