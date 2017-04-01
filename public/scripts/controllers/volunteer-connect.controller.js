app.controller('VolunteerConnectController', ['DataFactory', '$routeParams', '$http', function(DataFactory, $routeParams, $http) {
  var self = this;

  // console.log($routeParams);

  self.sendEmail = function(){
    console.log('send email button clicked');
    console.log(self.currentVolunteer.details[0]);
    $http({
      method: 'POST',
      url: '/search/send',
      data: self.currentVolunteer.details[0]
    }).then(function(response){
      console.log(response);
      swal(
        'Success!',
        'Your email has been sent.',
        'success'
      );
    })
};

  self.currentVolunteer=DataFactory.currentVolunteer;
  self.getVolunteer=DataFactory.getVolunteer($routeParams.id);

}]);
