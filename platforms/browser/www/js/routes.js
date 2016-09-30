angular.module('FindAParty')
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'views/Home/index.html',
        controller : 'HomeController',
        controllerAs : 'HomeCtrl'
      })
      .when('/Users/login', {
        templateUrl : 'views/Users/login.html',
        controller : 'UsersController',
        controllerAs : 'UsersCtrl'
      })
      .when('/Users/login/:msg', {
        templateUrl : 'views/Users/login.html',
        controller : 'UsersController',
        controllerAs : 'UsersCtrl'
      })
      .when('/Users', {
        templateUrl : 'views/Users/index.html',
        controller : 'UsersController',
        controllerAs : 'UsersCtrl'
      })
      .when('/Users/menu', {
        templateUrl : 'views/Users/menu.html',
        controller : 'UsersController',
        controllerAs : 'UsersCtrl'
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
      .when('/Parties/history/:isActive', {
        templateUrl : 'views/Parties/history.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/dashboard/:id', {
        templateUrl : 'views/Parties/dashboard.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/edit/:id', {
        templateUrl : 'views/Parties/edit.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/new', {
        templateUrl : 'views/Parties/new.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/filter', {
        templateUrl : 'views/Parties/filter.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/search', {
        templateUrl : 'views/Parties/search.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/favorite', {
        templateUrl : 'views/Parties/favorite.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .when('/Parties/search/:query', {
        templateUrl : 'views/Parties/search.html',
        controller : 'PartiesController',
        controllerAs : 'PartiesCtrl'
      })
      .otherwise({
        templateUrl : 'views/Home/404.html'
      });
  });