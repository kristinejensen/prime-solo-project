app.controller('LoginController', ['$firebaseAuth','$http', '$location', function($firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();

  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  auth.$onAuthStateChanged(function(firebaseUser){
    if(firebaseUser) {
      self.redirectToVolunteerProfile();
    } else {
      console.log('Not logged in or not authorized.');
    }
  });

  self.redirectToVolunteerProfile = function(){
    $location.url('/volunteer-profile');
  }



  // auth.$onAuthStateChanged(function(firebaseUser){
  //   if(firebaseUser) {
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //     self.volunteerProfile = [];
  //   }
  // });
  // firebaseUser.getToken().then(function(idToken){
  //   $http({
  //     method: 'GET',
  //     url: '/volunteer',
  //     headers: {
  //       id_token: idToken
  //     }
  //   }).then(function(response){
  //     self.volunteerProfile = response.data;
  //   });
  // });



}]);
