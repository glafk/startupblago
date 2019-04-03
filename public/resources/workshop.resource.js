app.factory('workshopResource', ['$resource', function($resource){
  return $resource('/workshop', {}, {
    getWorkshops: {method: 'GET', url: '/workshop', isArray: true}
  });
}])
