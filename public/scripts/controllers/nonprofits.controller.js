app.controller('NonprofitController', ['DataFactory', '$http' , function(DataFactory, $http) {
  var self = this;

  self.searchObject = {};
  console.log(self.searchObject);

  //accesses information from public API
    self.skills = DataFactory.skills;
    self.causes = DataFactory.causes;

}]);
