angular.module('macrotrack')
  .controller('TrackController', TrackController);

//  Manages adding foods / recipes to user log
function TrackController(TrackService, ProfileService, FoodService, RecipeService, MainService) {

  let track = this;

  //  May import food/recipe from another path (DO LATER)
  //  (OPTIONAL - FOR FUTURE) - Allow users to queue multiple items to add all at once

  //  logdate is current day by default
  track.logDate = new Date().toDateString();
  track.showWeight = true;
  track.activeUser = MainService.state;   //  { loggedIn, username, user_id }

  //  track.dayStats = { user_id, log_date, weight, calories, carbs, protein, fat }

  //  Check if today exists in database, set data accordingly
  track.checkByDate = (selectedDate) => {
    //  Search by user id and date.  Returns sum of data for date
    ProfileService.getLogByDate(track.activeUser.user_id, selectedDate).then(response => {
      if (response.length > 0) {
        track.editing = true;
        track.dayStats = response[0];
        track.displayLoggedItems();
      } else {
        track.editing = false;
        track.dayStats = {
          log_date: selectedDate
        }
      }
    });
  }
  //  track.dayStats = {id, user_id,log_date,weight,calories,carbs,protein,fat}

  //  Select a new date to log
  track.updateLogDate = () => {
    track.logDate = track.selectedDate.toDateString();
    track.checkByDate(track.logDate);
  }
  //  track.logDate

  //  Get all items logged for the day - UNFINISHED
  track.displayLoggedItems = () => {
    console.log('Day Stats:', track.dayStats);
    //  Fetch log items on date
    TrackService.getLoggedItems(track.dayStats.user_id, track.dayStats.log_date).then(response => {
      track.itemsToLog = response;
      console.log('Logging:', track.itemsToLog);
      track.loggedItems = [];
      track.getItemInformation();
    });
  }
  //  track.itemsToLog = {id, user_id,food_id,recipe_id,amount,log_date}

  //  Get information on items logged for the day
  track.getItemInformation = () => {
    //  Map through all in track.itemsToLog
    track.itemsToLog.map(item => {
      //  Check if item is a food or recipe
      if (item.food_id) {
        let itemAmount = item.amount;
        let logId = item.id;
        FoodService.getOneFood(item.food_id).then(response => {
          //  Add food properties to item
          item = response[0];
          item.amount = itemAmount;
          item.id = logId;
          console.log('This is a food:', item);
          track.loggedItems.push(item);
        });
      } else if (item.recipe_id) {
        let itemAmount = item.amount;
        let logId = item.id;
        RecipeService.getOneRecipe(item.recipe_id).then(response => {
          //  Add recipe properties to item
          item = response[0];
          item.amount = itemAmount;
          item.id = logId;
          console.log('This is a recipe:', item);
          track.loggedItems.push(item);
        });
      }
    });
  }
  //  track.loggedItems = {(food or recipe object),amount,id(of logged)}

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
  //  track.pendingData = {shown,type,calories,carbs,protein,fat,amount,date,user_id}

  //  Delete this item from the log.  Check in pending
  track.deleteFromLog = loggedItem => {
    console.log('UNFINISHED');
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
  //  forSubmission = {id,calories,carbs,protein,fat}

  //  Get information for items to submit and clear information
  function getFoodInformation(foodId) {
    FoodService.getOneFood(foodId).then(response => {
      track.receivedInformation = {
        type: 'food',
        itemId: response[0].id,
        name: response[0].name,
        variety: response[0].variety,
        serving: response[0].serving,
        brand: response[0].brand,
        user_id: response[0].user_id
      }
      addToPending(response[0]);
    });
  }
  //  track.receivedInformation = {type,itemId,name,variety,serving,brand,user_id}
  function getRecipeInformation(recipeId) {
    RecipeService.getOneRecipe(recipeId).then(response => {
      track.receivedInformation = {
        type: 'recipe',
        itemId: response[0].id,
        name: response[0].name,
        serving: response[0].serving
      }
      addToPending(response[0]);
    });
  }
  //  track.receivedInformation = {type,itemId,name,serving}
  function clearInformation() {
    track.receivedInformation = {}
  }
  //  CLEARS track.receivedInformation

  //  Add nutrition data to pending data
  function addToPending(foodInformation) {
    track.pendingData.calories = foodInformation.calories;
    track.pendingData.carbs = foodInformation.carbs;
    track.pendingData.protein = foodInformation.protein;
    track.pendingData.fat = foodInformation.fat;
  }
  //  track.pendingData = calories,carbs,protein,fat

  //  Submit or update record 
  track.submitRecord = () => {
    var itemInfo = {
      data: track.pendingData,
      itemId: track.receivedInformation.itemId
    }
    if (track.editing) {
      TrackService.updateLog(calculateSums(track.dayStats.id)).then(response => {
        track.logItem(response[0].id, itemInfo);
        track.checkByDate(track.logDate);
      });
    } else {
      TrackService.postLog(track.pendingData, track.logDate).then(response => {
        track.logItem(response[0].id, itemInfo);
        track.checkByDate(track.logDate);
      });
    }
    track.prepareEntry();
  }

  //  Log a food or recipe to a user's daily log
  track.logItem = (logId, itemInfo) => {
    var recordData = {
      user_id: track.activeUser.user_id,
      log_id: logId,
      item_id: itemInfo.itemId,
      amount: 1,
      log_date: track.logDate
    }
    if (itemInfo.data.type == 'food') {
      //  Add item to log_foods table using track.receivedItemInformation
      TrackService.postFoodRecord(recordData).then(
        //  Reset item selection?
      );
    }
    if (itemInfo.data.type == 'recipe') {
      //  Add item to log_recipes table using track.receivedItemInformation
      TrackService.postRecipeRecord(recordData).then(
        //  Reset item selection?
      );
    }
  }

  //  Update user weight
  track.updateWeight = () => {
    TrackService.updateWeight(track.dayStats).then(response => {
      track.showWeight = true;
      track.checkByDate(track.logDate);
    });
  }

  //  Update all information
  track.updateAll = () => {
    TrackService.updateAll(track.dayStats).then(response => {
      track.editAll = false;
      track.checkByDate(track.logDate);
    });
  }

  //  Run function to set log values
  track.checkByDate(track.logDate);
  track.prepareEntry('food', 1);

}
