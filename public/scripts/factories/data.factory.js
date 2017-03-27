app.factory('DataFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){
  var auth = $firebaseAuth();
  var skills = {list: []};
  var causes = {list: []};
auth.$onAuthStateChanged(skillList);
auth.$onAuthStateChanged(causeList);

//function to populate skills list
  function skillList(){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/data/skillList',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          skills.list = response.data;
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };

//function to populate causes list
  function causeList(){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/data/causeList',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          causes.list = response.data;
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };

  return {
    skills: skills,
    causes: causes
  }

}]); // end of app.factory
