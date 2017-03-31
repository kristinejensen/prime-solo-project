app.controller('VolunteerConnectController', ['DataFactory', '$routeParams', function(DataFactory, $routeParams) {
  var self = this;

  console.log($routeParams);

  self.currentPup=PupFactory.currentPup;
  self.getPup=PupFactory.getPup($routeParams.id);

}]);
