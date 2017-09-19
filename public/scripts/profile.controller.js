angular.module('macrotrack')
  .controller('ProfileController', ProfileController);

//  Manages displaying, sorting, and updating profile data
function ProfileController(ProfileService, MainService) {

  //  GOALS
    //  Lots of useful data visualization here:  Weight progress, macronutrient distribution, logged date rows, etc.

  let profile = this;

  //  Logged in user { loggedIn, username, user_id }
  profile.activeUser = MainService.state;
  profile.comments = [];

  //  Function to get all information on this profile
  profile.getAllUserInformation = (userId) => {
    //  Get user information
        //  profile.selectedUser { id, username, shared }
        //  profile.userGoals = {calories, carbs, protein, fat, goal_weight }
    //  Calculate user percentages
    //  Get user logs
    profile.getAllLogs(userId);
    //  Create progress history
    //  Get user comments
  }

  //  Fetch log events by user id
  profile.getAllLogs = (id) => {
    ProfileService.getAllLogs(id).then(response => {
      profile.allUserLogs = response;
      console.log('All user logs:', profile.allUserLogs);
    })
  }

  //  Calculate macronutrient percentages of daily goal
  function calculatePercentages(userGoals) {
    var macroTotal = ((userGoals.carbs || 0) + (userGoals.protein || 0) + (userGoals.fat || 0));
    if (!macroTotal == 0) {
      profile.percentages = {
        carbs: ((userGoals.carbs || 0) / macroTotal).toFixed(3),
        protein: ((userGoals.protein || 0) / macroTotal).toFixed(3),
        fat: ((userGoals.fat || 0) / macroTotal).toFixed(3)
      }
    } else {
      profile.percentages = null;
    }
  }

  console.log('Getting all user information!');
  profile.getAllUserInformation(1000);

}
