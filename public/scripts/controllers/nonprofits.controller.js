app.controller('NonprofitController', ['DataFactory', '$http' , function(DataFactory, $http) {
  var self = this;

  self.volunteerList = {list: []};
  self.searchObject = {};

// function to query db for matching volunteers
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
      console.log(response.data);
      self.volunteerList.list = response.data;
      if(self.volunteerList.list.length == 0)
      swal('Sorry...',
      'We did not find any matching volunteers'
    );
    self.searchResultsMessage = "Volunteer Matches"
    });
  };

    //accesses information from public API
      self.skills = DataFactory.skills;
      self.causes = DataFactory.causes;

}]);
