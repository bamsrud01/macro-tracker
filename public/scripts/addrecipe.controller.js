angular.module('macrotrack')
  .controller('AddRecipeController', AddRecipeController);

//  Manages CRUD operations on recipes
function AddRecipeController(AddRecipeService, RecipeService, MainService, $location) {

  let add = this;

  //  Redirect to view upon creation / update

  add.showForm = true;
  add.canCreate = true;
  add.canUpdate = false;

  //  Contains add.newRecipe {recipe_data}
  //  Contains add.ingredientsList [{ingredient_data}]
  //  Contains add.activeRecipeId
  add.ingredientsList = [];

  // If an existing recipe, populate fields
  if (AddRecipeService.existingRecipe) {
    add.canCreate = false;
    add.canUpdate = true;
    add.newRecipe = AddRecipeService.recipeToEdit;
    AddRecipeService.existingRecipe = false;
    RecipeService.getIngredients(add.newRecipe.id).then(response => {
      add.ingredientsList = response;
    });
  }

  //  Set mode to display buttons for Add, or for Update and Delete
  if (add.newRecipe) {
    add.editMode = true;
  } else {
    add.editMode = false;
  }

  //  Recipe with all fields at null
  const emptyRecipe = {
    name: null,
    serving: null,
    calories: null,
    carbs: null,
    fiber: null,
    protein: null,
    fat: null,
    directions: null,
    source: null,
    source_url: null,
    user_id: null
  };

  //  Function to submit a new recipe
  //  NOTE: Submit to recipes and ingredients
  add.submitNewRecipe = () => {
    if (MainService.state.loggedIn && add.newRecipe.name && add.newRecipe.directions && add.ingredientsList.length > 0) {
      add.newRecipe.user_id = MainService.state.user_id;
      AddRecipeService.submitNewRecipe(add.newRecipe).then(response => {
        console.log('Success!  New recipe created:', response);
        add.activeRecipeId = response[0].id;
        postIngredients(response[0].id);
        add.newRecipe = emptyRecipe;
      });

      // postIngredients();
    } else {
      console.log('Error!  Check required fields');
    }
  }

  //  Function to update a recipe
  add.updateRecipe = () => {
    AddRecipeService.updateRecipe(add.newRecipe).then(response => {
      console.log('Success!  Recipe updated:', response);
      //  Compare ingredients
      add.newRecipe = emptyRecipe;
    })
  }

  //  Add ingredient to array and clear fields
  add.saveIngredient = () => {
    add.ingredientsList.push({
      food_name: add.newIngredient.name,
      food_amount: add.newIngredient.amount
    });
    add.cancel();
  }

  //  Cancel ingredient and clear fields
  add.cancel = () => {
    add.newIngredient.name = '';
    add.newIngredient.amount = '';
    add.showForm = false;
  }

  //  Function to post ingredients array data
  function postIngredients(recipeId) {
    add.ingredientsList.map(ingredient => {
      ingredient.recipe_id = recipeId;
      AddRecipeService.submitIngredient(ingredient).then(response => {
        console.log('Successfully added ingredient:', response);
      });
    });
    add.ingredientsList = [];
  }

}
