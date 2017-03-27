app.controller('VolunteerProfileController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){
  var self = this;
  var auth = $firebaseAuth();

  self.volunteerProfile = {};
  self.availabilityData = {};

  auth.$onAuthStateChanged(getVolunteer);

  //populates volunteer profile information
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

  //function to clear "about me" section before updating
  self.clearAboutMe = function(volunteerId){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'DELETE',
          url: '/data/volunteer/aboutMe/' + volunteerId,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log('delete about me successful');
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
    getVolunteer();
  };

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

  //function to clear availability section before updating
  // self.clearAvailability = function(volunteerId){
  //   var firebaseUser = auth.$getAuth();
  //   if(firebaseUser){
  //     firebaseUser.getToken().then(function(idToken){
  //       $http({
  //         method: 'DELETE',
  //         url: '/data/volunteer/availability/' + volunteerId,
  //         headers: {
  //           id_token: idToken
  //         }
  //       }).then(function(response){
  //         console.log('delete availability successful');
  //       })
  //     })
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //   }
  // };

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
