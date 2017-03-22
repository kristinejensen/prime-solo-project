app.controller('HomeController', ['$http', '$location', function($http, $location){
  var self = this;

self.redirectLogin = function () {
  $location.url('/login');
}

self.redirectNonprofits = function () {
  $location.url('/nonprofits');
}

}]);
