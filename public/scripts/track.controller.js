angular.module('macrotrack')
  .controller('TrackController', TrackController);

//  Manages adding foods / recipes to user log
function TrackController(TrackService, ProfileService, FoodService, RecipeService, MainService) {

  let track = this;

  track.today = new Date().toDateString();
  track.showWeight = true;

  //  { loggedIn, username, user_id }
  track.activeUser = MainService.state;

  //  track.dayStats = { user_id, log_date, weight, calories, carbs, protein, fat }
  //  track.receivedItemInformation = { name, variety, serving, brand, author, id }
  //  track.itemInformation = { user_id, log_id, item_id, amount, log_date }
  //  track.updatedWeight = { user_id, log_date, weight }

  //  Check if today exists in database, set data accordingly
  track.checkForToday = () => {
    //  Search by user id and date.  Returns sum of data for date
    console.log('User id:', track.activeUser.user_id);
    console.log('Search date:', track.today);
    ProfileService.getLogByDate(track.activeUser.user_id, track.today).then(response => {
      console.log('Check response:', response);
      if (response.length > 0) {
        track.editing = true;
        track.dayStats = response[0];
        track.displayLoggedItems();
      } else {
        track.editing = false;
        track.dayStats = {
          log_date: track.today
        }
      }
      console.log('Editing:', track.editing);
    });
  }

  //  Get all items logged for the day - UNFINISHED
  track.displayLoggedItems = () => {
    console.log('GETTING ITEMS (code incomplete)');
    //  Will store response in track.loggedItems
  }

  //  Prepare data for a new logged item - MAY NEED ADJUSTMENT
  track.prepareEntry = (itemType, itemId) => {
    console.log('Item type:', itemType);
    if (itemType == 'food') {
      getFoodInformation(itemId);
    } else if (itemType == 'recipe') {
      getRecipeInformation(itemId);
    } else {
      clearInformation();
    }
    //  If not, clear receivedItemInformation and itemInformation
    track.pendingData = {
      shown: true,    //  Possible turn off later
      type: itemType,
      calories: null,
      carbs: null,
      protein: null,
      fat: null,
      amount: null,
      date: null,
      user_id: track.activeUser.user_id
    }
  }

  //  Calculate sum of existing data and pending data
  function calculateSums(dayId) {
    var forSubmission = {
      id: dayId
    };
    //  If property is undefined, set to 0
    function unToZero(existing, pending) {
      return (existing || 0) + (pending || 0);
    }
    forSubmission.calories = unToZero(track.dayStats.calories, track.pendingData.calories);
    forSubmission.carbs = unToZero(track.dayStats.carbs, track.pendingData.carbs);
    forSubmission.protein = unToZero(track.dayStats.protein, track.pendingData.protein);
    forSubmission.fat = unToZero(track.dayStats.fat, track.pendingData.fat);

    return forSubmission;
  }

  //  Get information for items to submit and clear information
  function getFoodInformation(foodId) {
    console.log('Get food information called with id:', foodId);
    FoodService.getOneFood(foodId).then(response => {
      console.log('Track got food data:', response[0]);
      track.receivedInformation = {
        type: 'food',
        name: response[0].name,
        variety: response[0].variety,
        serving: response[0].serving,
        brand: response[0].brand,
        user_id: response[0].user_id
      }
      console.log('receivedInformation object:', track.receivedInformation);
      addToPending(response[0]);
    });
  }
  function getRecipeInformation(recipeId) {
    RecipeService.getOneRecipe(recipeId).then(response => {
      console.log('Track got recipe data:', response[0]);
      track.receivedInformation = {
        type: 'recipe',
        name: response[0].name,
        serving: response[0].serving
      }
      console.log('receivedInformation object:', track.receivedInformation);
      addToPending(response[0]);
    });
  }
  function clearInformation() {
    track.receivedInformation = {}
  }

  //  Add nutrition data to pending data
  function addToPending(foodInformation) {
    track.pendingData.calories = foodInformation.calories;
    track.pendingData.carbs = foodInformation.carbs;
    track.pendingData.protein = foodInformation.protein;
    track.pendingData.fat = foodInformation.fat;
  }

  //  Submit or update record
    //  Idea: Pending should not be editable unless button is clicked to adjust
  track.submitRecord = () => {
    if (track.pendingData.type == 'food') {
      //  Add item to log_foods table using track.receivedItemInformation
    }
    if (track.pendingData.type == 'recipe') {
      //  Add item to log_recipes table using track.receivedItemInformation
    }
    if (track.editing) {
      TrackService.updateLog(calculateSums(track.dayStats.id)).then(response => {
        track.checkForToday();
      });
    } else {
      console.log('Current value of dayStats:', track.dayStats);
      console.log('Current value of pendingData', track.pendingData);
      TrackService.postLog(track.pendingData, track.today).then(response => {
        track.checkForToday();
      });
    }
    track.prepareEntry();
  }

  //  Toggle weight display and input
  track.editWeight = () => {
    track.showWeight = false;
  }

  //  Update user weight
  track.updateWeight = () => {
    TrackService.updateWeight(track.dayStats).then(response => {
      track.showWeight = true;
      track.checkForToday();
    });
  }


  //  HOW THIS WILL WORK
    //  ! Users will have ONE entry per day
    //  ! Every navigation to the page will GET all entries for that user
    //  ! The first entry of the day will CREATE a row (checking timestamps of each item to see if one exists for the day)
    //  ! Every subsequent entry will UPDATE the existing row
    //  ! Macronutrients may be manually entered, or automatically added for foods/recipes
    //  ! Provide a preview of new data before user approves it
    //  Foods and recipes will be added to a secondary table referencing the history table
    //  Add feature to remove logged items, as well as adjust daily log accordingly.
    //  Possibly edit daily numbers directly
    //  Add feature to edit previous days
    //  ! Update weight

  //  May import food/recipe from another path (DO LATER)

  //  (OPTIONAL - FOR FUTURE) - Allow users to queue multiple items to add all at once

  //  Run function to set log values
  track.checkForToday();
  track.prepareEntry();

}
