angular.module('macrotrack')
  .controller('ProfileController', ProfileController);

//  Manages displaying, sorting, and updating profile data
function ProfileController(ProfileService, MainService) {

  //  GOALS
    //  Lots of useful data visualization here:  Weight progress, macronutrient distribution, logged date rows, etc.

  let profile = this;

  //  Logged in user { loggedIn, username, user_id }
  profile.activeUser = MainService.state;

  //  Store user data in profile.selectedUser { id, username, password, email, shared, calories, carbs, protein, fat, goal_weight }

  //  Fetch log events by user id
  profile.getAllLogs = (id) => {
    ProfileService.getAllLogs(id).then(response => {
      profile.allUserLogs = response;
      console.log('All user logs:', profile.allUserLogs);
    })
  }

  //  Calculate macronutrient percentages of daily goal
  function calculatePercentages(user) {
    var macroTotal = ((user.carbs || 0) + (user.protein || 0) + (user.fat || 0));
    if (!macroTotal == 0) {
      profile.percentages = {
        carbs: ((user.carbs || 0) / macroTotal).toFixed(3),
        protein: ((user.protein || 0) / macroTotal).toFixed(3),
        fat: ((user.fat || 0) / macroTotal).toFixed(3)
      }
    } else {
      profile.percentages = null;
    }
  }

}
