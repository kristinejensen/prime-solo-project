var app = angular.module('ConnectApp', ['ngRoute','firebase']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    controllerAs: 'hc'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'lc'
  })
  .when('/nonprofits', {
    templateUrl: 'views/nonprofits.html',
    controller: 'NonprofitController',
    controllerAs: 'nc'
  })
  .when('/volunteer-profile', {
    templateUrl: 'views/volunteer-profile.html',
    controller: 'VolunteerProfileController',
    controllerAs: 'vp'
  })
  .otherwise({
    redirectTo: 'home'
  })
}]); // end of app.config
