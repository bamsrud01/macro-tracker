angular.module('macrotrack')
  .controller('TrackController', TrackController);

//  Manages adding foods / recipes to user log
function TrackController(TrackService, ProfileService, MainService) {

  let track = this;

  track.today = new Date().toDateString();

  //  { loggedIn, username, user_id }
  track.activeUser = MainService.state;

  //  track.logItem = { user_id, log_date, weight, calories, carbs, protein, fat }
  //  track.entryData = { shown, itemId, calories, carbs, protein, fat, amount, date }
  track.entryData = {
    shown: false,
    itemId: null,
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    amount: 0,
    date: null
  }

  //  Check if today exists in database, set data accordingly
  track.checkForToday = () => {
    ProfileService.getLogByDate(track.activeUser.user_id, track.today).then(response => {
      if (response.length > 0) {
        track.editing = true;
        track.logItem = response[0];
      } else {
        track.editing = false;
        track.logItem = {
          user_id: track.activeUser.user_id,
          log_date: track.today
        }
      }
      console.log('Today\'s logged data:', response);
      console.log('Editing:', track.editing);
    });
  }

  //  Submit or update record
  track.submitRecord = () => {
    if (track.editing) {
      TrackService.updateLog(track.logItem).then(response => {
        console.log('Log response:', response);
        checkForToday();
      });
    } else {
      console.log('Current value of logItem:', track.logItem);
      TrackService.postLog(track.logItem).then(response => {
        console.log('Log response:', response);
        checkForToday();
      });
    }
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

}
