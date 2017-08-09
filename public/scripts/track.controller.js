angular.module('macrotrack')
  .controller('TrackController', TrackController);

//  Manages adding foods / recipes to user log
function TrackController(TrackService, MainService) {

  let track = this;

  //  { loggedIn, username, user_id }
  track.activeUser = MainService.state;

  //  HOW THIS WILL WORK
    //  Users will have ONE entry per day
    //  Every navigation to the page will GET all entries for that user
    //  The first entry of the day will CREATE a row (checking timestamps of each item to see if one exists for the day)
    //  Every subsequent entry will UPDATE the existing row
    //  Macronutrients may be manually entered, or automatically added for foods/recipes
    //  Provide a preview of new data before user approves it
    //  Foods and recipes will be added to a secondary table referencing the history table

  //  May import food/recipe from another path (DO LATER)




}
