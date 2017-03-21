app.controller('VolunteerController', ['$http', '$location', function($http, $location){
  console.log('Volunteer controller loaded');
  var self = this;

  self.redirectVolunteers = function () {
    $location.url('views/volunteer-profile.html');
  }
}]);
