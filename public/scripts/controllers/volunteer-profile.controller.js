app.controller('VolunteerProfileController', ['$firebaseAuth', '$http', '$location', function($firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();









  // auth.$onAuthStateChanged(function(firebaseUser){
  //   if(firebaseUser) {
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //   }
  // });


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
