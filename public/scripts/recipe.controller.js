angular.module('macrotrack')
  .controller('RecipeController', RecipeController);

//  Manages displaying and sorting existing recipe objects
function RecipeController(MainService, RecipeService, AddRecipeService, $location) {

  let recipe = this;

  //  { loggedIn, username, user_id }
  recipe.activeUser = MainService.state;

  //  Function to get all recipes in the database
  recipe.getAllRecipes = () => {
    RecipeService.getAllRecipes().then(recipeData => {
      recipe.listedRecipes = recipeData;
    });
  }

  //  Function to edit food if same user_id
  recipe.editRecipe = (recipeObject) => {
    AddRecipeService.existingRecipe = true;
    AddRecipeService.recipeToEdit = recipeObject;
    $location.path('/add-recipe');
  }

  //  Get all recipes in database when opening view
  recipe.getAllRecipes();

}
