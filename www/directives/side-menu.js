angular.module('FindAParty')
  .directive('sideMenu', function(){
    return {
      restrict : 'E',
      templateUrl : 'templates/side-menu.html'
    };
  });