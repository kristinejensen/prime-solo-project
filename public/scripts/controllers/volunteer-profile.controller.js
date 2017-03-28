app.controller('VolunteerProfileController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){
  var self = this;
  var auth = $firebaseAuth();

  self.volunteerProfile = {};
  self.volunteerSkills = {};
  self.availabilityData = {};
  self.volunteerCauses = {};

  auth.$onAuthStateChanged(getVolunteer);
  auth.$onAuthStateChanged(getSkills);
  auth.$onAuthStateChanged(getAvailability);
  auth.$onAuthStateChanged(getCauses);


  //populates volunteer profile information on page load
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

  //populates volunteer skill information on page load
  function getSkills(){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/data/volunteer/skills',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.volunteerSkills = response.data;
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };

  //populates volunteer availability information on page load
  function getAvailability(){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/data/volunteer/availability',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.availabilityData = response.data;
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };

  // populates volunteer cause information on page load
  function getCauses(){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/data/volunteer/causes',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.volunteerCauses = response.data;
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };

  self.skills = DataFactory.skills;
  self.causes = DataFactory.causes;


  //function to update "about me" section
  self.updateAboutMe = function(volunteerId){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'PUT',
          url: '/data/volunteer/aboutMe/' + volunteerId,
          data: self.volunteerProfile,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log('insert about me successful');
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
    getVolunteer();
  };


  // function to update skills section
  self.updateSkills = function(volunteerId){
    console.log('update skills button clicked');
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'PUT',
          url: '/data/volunteer/skills/' + volunteerId,
          data: self.volunteerProfile,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log('insert skills successful');
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
    getVolunteer();
  };

  //function to update availability section
  self.updateAvailability = function(volunteerId){
    console.log('update availability button clicked');
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'PUT',
          url: '/data/volunteer/availability/' + volunteerId,
          data: self.availabilityData,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log('insert availability successful');
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
    getVolunteer();
  };

  // function to update causes section
  self.updateCauses = function(volunteerId){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'PUT',
          url: '/data/volunteer/causes/' + volunteerId,
          data: self.volunteerProfile,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log('insert causes successful');
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
    getVolunteer();
  };

  // self.deleteProfile = function(volunteerId){
  //
  // }

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
