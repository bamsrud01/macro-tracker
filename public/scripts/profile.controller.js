angular.module('macrotrack')
  .controller('ProfileController', ProfileController);

//  Manages displaying, sorting, and updating profile data
function ProfileController(ProfileService, MainService, CommentService) {

  //  GOALS
    //  Lots of useful data visualization here:  Weight progress, macronutrient distribution, logged date rows, etc.

  let profile = this;

  //  progile.activeUser = { loggedIn, username, user_id }
  //  profile.selectedUser = { id, username, shared }
  //  profile.userGoals = {calories, carbs, protein, fat, goal_weight }

  profile.activeUser = MainService.state;
  profile.comments = [];

  //  Function to get all information on this profile
  profile.getAllUserInformation = (userId) => {
    //  Get user information
    ProfileService.getUserInformation(userId).then(response => {
      profile.selectedUser = {
        id: response[0].id,
        username: response[0].username,
        shared: response[0].shared
      }
      profile.userGoals = {
        calories: response[0].calories,
        carbs: response[0].carbs,
        protein: response[0].protein,
        fat: response[0].fat,
        goal_weight: response[0].goal_weight
      }
      console.log('Selected User:', profile.selectedUser);
      console.log('User goals:', profile.userGoals);
      //  Calculate user percentages
      calculatePercentages(profile.userGoals);
    });
    //  Get user logs
    profile.getAllLogs(userId);
    //  Create progress history
    //  Get user comments
    CommentService.getComments('profile', userId).then(response => {
      profile.comments = response;
      console.log('Comments:', profile.comments)
    });
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
