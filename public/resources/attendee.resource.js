app.factory('attendeeResource', ['$resource', function($resource){
  return $resource('/attendee', {} , {signup: {method: 'POST', url: '/attendee'}});
}])
