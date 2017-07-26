angular.module('macrotrack')
  .controller('RecipeController', RecipeController);

//  Manages displaying and sorting existing recipe objects
function RecipeController(RecipeService) {

  let recipe = this;

  //  Function to get all recipes in the database
  recipe.getAllRecipes = () => {
    RecipeService.getAllRecipes().then(recipeData => {
      recipe.listedRecipes = recipeData;
    });
  }

  //  Get all recipes in database when opening view
  recipe.getAllRecipes();

}
