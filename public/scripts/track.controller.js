angular.module('macrotrack')
  .controller('TrackController', TrackController);

//  Manages adding foods / recipes to user log
function TrackController(TrackService, ProfileService, MainService) {

  let track = this;

  track.today = new Date().toDateString();

  //  { loggedIn, username, user_id }
  track.activeUser = MainService.state;

  //  track.dayStats = { user_id, log_date, weight, calories, carbs, protein, fat }
  //  track.updatedWeight = { user_id, log_date, weight }

  //  Check if today exists in database, set data accordingly
  track.checkForToday = () => {
    ProfileService.getLogByDate(track.activeUser.user_id, track.today).then(response => {
      if (response.length > 0) {
        track.editing = true;
        track.dayStats = response[0];
        track.displayLoggedItems();
      } else {
        track.editing = false;
        track.dayStats = {
          user_id: track.activeUser.user_id,
          log_date: track.today
        }
      }
      console.log('Today\'s logged data:', response);
      console.log('Editing:', track.editing);
    });
  }

  //  Get all items logged for the day - UNFINISHED
  track.displayLoggedItems = () => {
    console.log('GETTING ITEMS (code incomplete)');
    //  Will store response in track.loggedItems
  }

  //  Prepare data for a new logged item - MAY NEED ADJUSTMENT
  track.prepareEntry = (itemType) => {
    console.log(itemType);
    track.pendingData = {
      shown: true,
      itemId: null,
      calories: null,
      carbs: null,
      protein: null,
      fat: null,
      amount: null,
      date: null
    }
  }

  //  Prepare sum of existing data and pending data
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

    console.log('Sums of fields:', forSubmission);
    return forSubmission;
  }

  //  Submit or update record
  //  CURRENTY UPDATES DIRECTLY.
    //  Adjust so submitted data is sum of existing and pending
    //  Idea: Pending should not be editable unless button is clicked to adjust
  track.submitRecord = () => {
    if (track.editing) {
      TrackService.updateLog(calculateSums(track.dayStats.id)).then(response => {
        console.log('Log response:', response);
        track.checkForToday();
      });
    } else {
      console.log('Current value of dayStats:', track.dayStats);
      TrackService.postLog(track.pendingData).then(response => {
        console.log('Log response:', response);
        track.checkForToday();
      });
    }
    track.prepareEntry();
  }


  //  HOW THIS WILL WORK
    //  ! Users will have ONE entry per day
    //  ! Every navigation to the page will GET all entries for that user
    //  ! The first entry of the day will CREATE a row (checking timestamps of each item to see if one exists for the day)
    //  ! Every subsequent entry will UPDATE the existing row
    //  Macronutrients may be manually entered, or automatically added for foods/recipes
    //  Provide a preview of new data before user approves it
    //  Foods and recipes will be added to a secondary table referencing the history table
    //  Add feature to remove logged items, as well as adjust daily log accordingly.
    //  Possibly edit daily numbers directly
    //  Add feature to edit previous days

  //  May import food/recipe from another path (DO LATER)


  //  Run function to set log values
  track.checkForToday();
  track.prepareEntry(null);

}
