app.controller('AuthController', function($scope, $http, attendeeResource, Authentication, workshopResource){

  $scope.workshops = [];
  console.log(Authentication.isAuthenticated())
  if(Authentication.isAuthenticated())
  {
    $http.get('/workshop').then(function (workshops) {
       var workshopsCopy = [];
       workshops.data.forEach(function(workshop){
         workshop.fullState = false;
         workshop.imgSrc = "/photos/" + workshop.presenterPhoto;
         workshopsCopy.push(workshop);
       })
       $scope.workshops = workshopsCopy;
    })
  }

  $scope.attendee = {};
  $scope.Authentication = Authentication;

  $scope.signup_attendee = function(){
    var attendee = new attendeeResource($scope.attendee);
    attendee.$signup().then(function(attendee){
      Authentication.attendee = attendee;
      $http.get('/workshop').then(function (workshops) {
         var workshopsCopy = [];
         workshops.data.forEach(function(workshop){
           workshop.fullState = false;
           workshop.imgSrc = "/photos/" + workshop.presenterPhoto;
           workshopsCopy.push(workshop);
         })
         $scope.workshops = workshopsCopy;
         console.log($scope.workshops);
      })
    })
  }

  $scope.signup = function(workshop)
  {
    $http.post('/workshop', {workshopId: workshop._id, name: Authentication.attendee.name, email: Authentication.attendee.email, code: Authentication.attendee.code}).then(function(success){
      if(success){
        workshop.attendees.push(Authentication.attendee);
      }
    })
  }

  $scope.signout = function (workshop) {
    $http.post('/signout', {workshopId: workshop._id, code: Authentication.attendee.code}).then(function(success){
      var indexOfAttendee = workshop.attendees.map(function(attendee){return attendee.code}).indexOf(Authentication.attendee.code);
      workshop.attendees.splice(indexOfAttendee, 1);
    })
  }

  $scope.hasSignedUp = function(workshop)
  {
    if(workshop.attendees.find(x => x.code == Authentication.attendee.code)) return true;
  }

  $scope.isNotFull = function (workshop) {
    if(workshop.attendees.length < workshop.capacity) return true;
  }

  $scope.isAfternoon = function (workshop) {
    if(workshop.type == "Afternoon") return true;
    else return false;
  }

  $scope.toggleFullState = function (workshop){
    workshop.fullState = !workshop.fullState;
  }
})
