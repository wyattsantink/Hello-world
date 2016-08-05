angular.module('FindAParty')
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'views/Home/index.html',
        controller : 'HomeController',
        controllerAs : 'HomeCtrl'
      })
      .otherwise({
        templateUrl : 'views/Home/404.html'
      });
  });