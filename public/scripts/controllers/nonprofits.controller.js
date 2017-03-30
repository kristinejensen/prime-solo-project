app.controller('NonprofitController', ['DataFactory', '$http' , function(DataFactory, $http) {
  var self = this;

  var volunteerList = {list: []};

  self.searchObject = {};

  self.searchVolunteers = function(){
    var params = {
      skill: self.searchObject.skill.id,
      cause: self.searchObject.cause.id,
      morning: self.searchObject.morning,
      afternoon: self.searchObject.afternoon,
      evening: self.searchObject.evening,
      weekday: self.searchObject.weekdays,
      weekend: self.searchObject.weekends,
      open: self.searchObject.open
    };
    $http({
      method: 'GET',
      url: '/search/volunteer',
      params: params
    }).then(function (response){
      volunteerList.list = response.data;
      console.log(volunteerList.list);
    });
  }; //end of searchVolunteers function


    //accesses information from public API
      self.skills = DataFactory.skills;
      self.causes = DataFactory.causes;

}]);
