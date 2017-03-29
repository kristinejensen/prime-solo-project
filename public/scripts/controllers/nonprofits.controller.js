app.controller('NonprofitController', ['DataFactory', '$http' , function(DataFactory, $http) {
  var self = this;

  var volunteerResultList = {list: []};

  self.searchObject = {};

  self.searchVolunteers = function(){
    var params = {
      skill: self.searchObject.skill.id,
      cause: self.searchObject.cause.id,
      morningAvailability: self.searchObject.morning,
      afternoonAvailability: self.searchObject.afternoon,
      eveningAvailability: self.searchObject.evening,
      weekdayAvailability: self.searchObject.weekdays,
      weekendAvailability: self.searchObject.weekends,
      openAvailability: self.searchObject.open
    };

    
  }; //end of searchVolunteers function


    // {{nc.searchObject.skill.id}}
    // {{nc.searchObject.cause.id}}
    // {{nc.searchObject.morning}}
    // {{nc.searchObject.afternoon}}
    // {{nc.searchObject.evening}}
    // {{nc.searchObject.weekdays}}
    // {{nc.searchObject.weekends}}
    // {{nc.searchObject.open}}

    //accesses information from public API
      self.skills = DataFactory.skills;
      self.causes = DataFactory.causes;

}]);
