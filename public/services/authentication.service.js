app.factory('Authentication', ['attendeeResource', '$window', function(attendeeResource, $window){
    var attendee;
    console.log($window.customUserObject);
    if(!!$window.customUserObject){
        attendee = new attendeeResource();
        angular.extend(attendee, $window.customUserObject);
    }

    return {
        attendee: attendee,
        isAuthenticated: function(){
            return !!this.attendee
        }
    }

}]);
