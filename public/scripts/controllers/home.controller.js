app.controller('HomeController', ['$http', '$location', function($http, $location){
  var self = this;

self.redirectVolunteers = function () {
  $location.url('/volunteers');
}

self.redirectNonprofits = function () {
  $location.url('/nonprofits');
}

}]);
