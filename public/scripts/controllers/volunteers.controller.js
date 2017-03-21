app.controller('VolunteerController', ['$http', '$location', function($http, $location){
  var self = this;

  self.redirectVolunteerProfile = function(){
    $location.url('/volunteer-profile');
  }

}]);
