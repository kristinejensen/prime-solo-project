app.controller('HomeController', ['$http', '$location', function($http, $location){
  console.log('Home controller loaded');
  var self = this;

self.redirectVolunteers = function () {
  $location.url('views/volunteers.html');
}

self.redirectNonprofits = function () {
  $location.url('views/nonprofits.html');
}

}]);
