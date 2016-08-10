angular.module('FindAParty')
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'views/Home/index.html',
        controller : 'HomeController',
        controllerAs : 'HomeCtrl'
      })
      .when('/Parties', {
        templateUrl : 'views/Parties/index.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/:id', {
        templateUrl : 'views/Parties/show.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .otherwise({
        templateUrl : 'views/Home/404.html'
      });
  });