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
      .when('/Parties/show/:id', {
        templateUrl : 'views/Parties/show.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/host', {
        templateUrl : 'views/Parties/host.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/dashboard/:id', {
        templateUrl : 'views/Parties/dashboard.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .otherwise({
        templateUrl : 'views/Home/404.html'
      });
  });