app.controller('NonprofitController', ['$http', 'DataFactory', function($http, DataFactory){
  var self = this;

//accesses information from public API
  self.skills = DataFactory.skills;
  self.causes = DataFactory.causes;

}]);
