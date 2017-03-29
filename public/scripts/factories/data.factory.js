app.factory('DataFactory', ['$http', function($http){
  var skills = {list: []};
  var causes = {list: []};

  skillList();
  causeList();

//function to populate skills list
  function skillList(){

        $http({
          method: 'GET',
          url: '/list_data/skillList'
        }).then(function(response){
          skills.list = response.data;
        })
  };

//function to populate causes list
  function causeList(){
        $http({
          method: 'GET',
          url: '/list_data/causeList'
        }).then(function(response){
          causes.list = response.data;
        })
  };

  return {
    skills: skills,
    causes: causes
  }

}]); // end of app.factory
