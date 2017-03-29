app.controller('NonprofitController', ['DataFactory', '$http' , function(DataFactory, $http) {
  var self = this;

  self.searchSkills = {};
  self.searchCauses = {};
  self.searchAvailability = {};

  //accesses information from public API
    self.skills = DataFactory.skills;
    self.causes = DataFactory.causes;

}]);
