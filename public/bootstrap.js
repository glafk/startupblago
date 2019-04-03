angular.element(document).ready(function () {

	//Bootstrap the document and get identity
	var $injector = angular.bootstrap(document, ['Startup']);
	//var rootScope = $injector.get('$rootScope');
	var Authentication = $injector.get('Authentication');
  var workshopResource = $injector.get('workshopResource');
})
