var app = angular.module('Startup', ['ngCookies','ngRoute', 'ngResource']);

app.config(function ($routeProvider, $sceProvider) {
  console.log("Configuring app");
	$sceProvider.enabled(false);

	$routeProvider
		.when('/', {
			templateUrl: '/partials/home',
			controller: 'AuthController'
		})
})
