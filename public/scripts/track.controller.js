angular.module('macrotrack')
  .controller('TrackController', TrackController);

//  Manages adding foods / recipes to user log
function TrackController(TrackService, ProfileService, MainService) {

  let track = this;

  track.today = new Date().toDateString();

  //  { loggedIn, username, user_id }
  track.activeUser = MainService.state;

  //  track.dayStats = { user_id, log_date, weight, calories, carbs, protein, fat }

  //  Check if today exists in database, set data accordingly
  track.checkForToday = () => {
    ProfileService.getLogByDate(track.activeUser.user_id, track.today).then(response => {
      if (response.length > 0) {
        track.editing = true;
        track.dayStats = response[0];
        track.pendingData.id = track.dayStats.id;
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

  //  Get all items logged for the day
  track.displayLoggedItems = () => {
    console.log('GETTING ITEMS (code incomplete)');
    //  Will store response in track.loggedItems
  }

  //  Prepare data for a new logged item
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

  //  Submit or update record
  //  MAY NO LONGER BE ACCURATE.  Check where data should be coming from
  track.submitRecord = () => {
    if (track.editing) {
      TrackService.updateLog(track.pendingData).then(response => {
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
