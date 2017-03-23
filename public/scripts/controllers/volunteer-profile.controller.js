app.controller('VolunteerProfileController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){
  var self = this;
  var auth = $firebaseAuth();

  self.volunteerProfile = {};
  console.log(self.volunteerProfile);

  self.availabilityData = {};

  // volunteerObject = {
  //   name:
  //   email:
  //   linkedin:
  //   bio:
  //
  // };

  getVolunteer();

  function getVolunteer(){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/data/volunteer',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.volunteerProfile = response.data;
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };

  self.skills = DataFactory.skills;
  self.causes = DataFactory.causes;

  self.saveProfile = function(volunteerId){

  }

  self.deleteProfile = function(volunteerId){

  }

  // function that logs user out on button click
  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
      self.redirectHome();
    });
  };

  // function to redirect user to home page after logout
  self.redirectHome = function(){
    $location.url('/home');
  }

}]);
