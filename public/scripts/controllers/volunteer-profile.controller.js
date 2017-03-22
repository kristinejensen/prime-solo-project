app.controller('VolunteerProfileController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){
  var self = this;
  var auth = $firebaseAuth();

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
          console.log(self.volunteerProfile);
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };


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
