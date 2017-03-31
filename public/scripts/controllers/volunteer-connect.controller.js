app.controller('VolunteerConnectController', ['DataFactory', '$routeParams', function(DataFactory, $routeParams) {
  var self = this;

  console.log($routeParams);

  self.currentVolunteer=DataFactory.currentVolunteer;
  self.getVolunteer=DataFactory.getVolunteer($routeParams.id);

}]);
